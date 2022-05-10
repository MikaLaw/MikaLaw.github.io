import { isMatching, templates } from "./helpers.js";
import { Model } from "./model.js";

export const View = {
  renderFriends: renderFriends,
};
// Variables
const filter = document.querySelector(".filter");
const filterInputs = document.querySelectorAll(".search__input");
const friendsList = document.querySelector(".all-friends__list");
const selectedFriendsList = document.querySelector(".selected-friends__list");
const filterSaveBtn = document.querySelector(".filter__save");
let renderedFriends = [];

function renderFriends(friends) {
  let friend = null;

  friends.forEach((item) => {
    friend = new Friend(item.data ? item.data : item, item.isSelected);
    friend.render();
    renderedFriends.push(friend);
  });

  friendClickHandler();
  filterInputHandler();
  friendsDragHandler();
  saveBtnClickHandler();
}

function friendClickHandler() {
  filter.addEventListener("click", (e) => {
    const target = e.target.closest(".friend-btn ");

    if (target) {
      const id = target.dataset.id;

      renderedFriends.forEach((friend) => {
        if (friend.data.id === +id) {
          friend.isSelected = !friend.isSelected;
          friend.render();
        }
      });
    }
  });
}

function filterInputHandler() {
  [...filterInputs].forEach((filter) =>
    filter.addEventListener("input", (e) => {
      const filterValue = e.target.value;
      console.log(e.target.dataset.selected);
      const isSelected = JSON.parse(e.target.dataset.selected);

      renderedFriends.forEach((friend) => {
        const match =
          isMatching(friend.data["first_name"], filterValue) ||
          isMatching(friend.data["last_name"], filterValue);

        if (friend.isSelected === isSelected) {
          match ? friend.render() : friend.remove();
        }
      });
    })
  );
}

function friendsDragHandler() {
  let currentDrag;
  const removeActiveClass = (items) => {
    for (let item of items) {
      item.classList.remove("active");
    }
  };
  const currentDragItem = (e) => e.target.closest(".friends-list__item");
  const zones = document.querySelectorAll(".friends__list");

  for (const zone of zones) {
    zone.addEventListener("dragstart", (e) => {
      currentDrag = { source: zone, node: e.target };
    });

    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (currentDrag.source !== zone && currentDragItem(e)) {
        currentDragItem(e).classList.add("active");
        let siblings = Array.from(
          currentDragItem(e).parentNode.children
        ).filter((el) => el !== currentDragItem(e));
        removeActiveClass(siblings);
      }
    });

    zone.addEventListener("drop", (e) => {
      if (currentDrag) {
        e.preventDefault();
        removeActiveClass(document.querySelectorAll(".friends-list__item"));

        if (currentDrag.source !== zone) {
          let targetItem = currentDragItem(e);
          const id = +currentDrag.node.querySelector("[data-id]").dataset.id;

          renderedFriends.forEach((friend) => {
            if (friend.data.id === id) {
              friend.isSelected = !friend.isSelected;
              if (targetItem) {
                friend.insert(targetItem.nextElementSibling);
              } else {
                friend.render();
              }
            }
          });
        }
        currentDrag = null;
      }
    });
  }
}

function saveBtnClickHandler() {
  filterSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    Model.saveFriends(renderedFriends);
  });
}
class Friend {
  constructor(data, selected) {
    this.data = data;
    this.isSelected = selected || false;
    this.element = null;
  }

  createElement() {
    const li = document.createElement("li");

    li.classList.add("friends-list__item");
    li.draggable = true;
    li.innerHTML = templates.friendTemplate(this.data, this.isSelected);

    return li;
  }

  insert(beforeNode) {
    if (this.element) {
      this.remove();
    }

    this.element = this.createElement();

    if (this.isSelected) {
      selectedFriendsList.insertBefore(this.element, beforeNode);
    } else {
      friendsList.insertBefore(this.element, beforeNode);
    }
  }

  remove() {
    this.element.remove();
  }

  render() {
    if (this.element) {
      this.remove();
    }

    this.element = this.createElement();

    if (this.isSelected) {
      selectedFriendsList.appendChild(this.element);
    } else {
      friendsList.appendChild(this.element);
    }
  }
}
