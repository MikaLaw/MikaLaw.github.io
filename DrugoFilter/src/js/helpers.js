export function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}
export const templates = {
    friendTemplate({ photo_100, first_name, last_name, id }, selected) {
        return `
            <div class="friend__info">
                <div class="friend__avatar"><img src="${photo_100}" alt="${first_name} ${last_name}" draggable="false"></div>
                <div class="friend__name">${first_name} ${last_name}</div>
            </div>
            ${selected ?
            (`<button data-id="${id}" class="friend-btn btn--delete" type="button"></button>`)
            :
            (`<button data-id="${id}" data-action="add" class="friend-btn  btn--add" type="button"></button>`)
        }
            `;
    }
};