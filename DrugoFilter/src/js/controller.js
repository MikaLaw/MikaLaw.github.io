import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = {
  init() {
    const friendFields = "photo_100, last_name, first_name, id";
    const appId = 7929780;
    const accessNumber = 2;

    if (JSON.parse(localStorage.getItem("friends") || null)) {
      const friends = JSON.parse(localStorage.getItem("friends"));
      View.renderFriends(friends);
    } else {
      const dataStatic = [
        {
          data: {
            id: 12159,
            first_name: "Антон",
            last_name: "Херсун",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/PfBUeZ_aPvUcmpkfFjADeoLvp5NPoBCTa68lkJvwlH5ZRTk3s-MpH_BDK8z3-P5Qxbfz9RSVvlPe6W8l8ATqZtsy.jpg?size=100x100&quality=96&crop=0,144,863,863&ava=1",
            track_code:
              "da32f2dctICAJm0wLRBvgltaXXi6HKWLBC4uwAUWGs4KeRooF4LV4-MXbGQrHWOyNqf314d8w_k",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 24004,
            first_name: "Данил",
            last_name: "Константинов",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/gAFLAg_lrGYLlbRfwt4GmQyqMbuOQkdnqf9E1ItmcAEXWXBBC3nKS3ZakzwXzJD5QMHP483q.jpg?size=100x100&quality=96&crop=0,10,1638,1638&ava=1",
            track_code:
              "aebc29d2dUqJMng2Xby8WQQud8SRN_GCEYGCUQ72YW7linxAdqIUKb1VfztUurFuaNPda6xXl_A",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 46759,
            first_name: "Евгения",
            last_name: "Мельникова",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/SBJRQraj4S52oZK9bk5Ey2MSetTtJTUJ1M_ABs8aH8d4Q-ahxNXzLEOL8ON8TNZ3eQhSf5Nf.jpg?size=100x100&quality=96&crop=409,207,787,787&ava=1",
            track_code:
              "ecba697djeY36ftoGAEE7MZJAL5FDR7nbd2wGFeYARLOZHN2aG_shQbcrj0WUgiJqbSqEXhteJU",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 95541,
            first_name: "Николай",
            last_name: "Чернобаев",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig2/LaV3J6wdi7ogslHp0RI2Y5oyOmQcRde0wABUYIyISMRRQzlxYLiI3qf3Rg7oCdlsj3yVFC2OKa1h3ZhfxGqgvtr4.jpg?size=100x100&quality=95&crop=160,296,1356,1356&ava=1",
            track_code:
              "5363873aYnhTCsp_QMIQP0Tlo-Yup5tO-wMKu-0fa64mckliPOsDG2JuknhDzxIMKhgJSRPH_Tw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 171276,
            first_name: "Дмитрий",
            last_name: "Ковальчук",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/WfsvNM0anFUHv-7pID1ztsaZIob2S1Fn-R7sSAcMxkM-o5iAy9TCeeTlaELaAN1KsFmoZN3wfTgrfeLoKtQfWZi2.jpg?size=100x100&quality=95&crop=303,174,641,641&ava=1",
            track_code:
              "1a9a7522NvGMiQ3ZHIfaCSS-Yn07CJuY7iGhB4I5j_sQ0JkP0h1Xkr27Dt5J049dJk_bywh_j-qH",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 189455,
            first_name: "Андрей",
            last_name: "Ковальчук",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/fiHBMB7xx-TisaFNUq3I8iTlAvjsV0miF8hGqFaIfOjyLl-znICy8aV3u7Nzbe8hpizErQrUKktq4foW56U-mVRa.jpg?size=100x100&quality=95&crop=309,93,574,574&ava=1",
            track_code:
              "1447f933fphxABv5ENlF-kxxMv9jpfj2Lb56JS8rffoNRjIZMh8f-xUxG_ca1UCrT4CLSVDS7IRE",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 199007,
            deactivated: "deleted",
            first_name: "Кира",
            last_name: "Шатулова",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "d1db680eO3aeIigKHRNeE2m0A9CzNJrgfMsDQhv7SkZxV_PxzBJaFapAKFEWGgoSaUW6ZoBDjpIV",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 256481,
            first_name: "Александра",
            last_name: "Вейт",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/-a0cR5rc35fOeur67Qe1Yx0r8OkV9WhlRQXv0sT_PYzcMqnXicnK4NeHzenrzMQTnZdaBWzU.jpg?size=100x100&quality=96&crop=0,154,960,960&ava=1",
            track_code:
              "214979b0-0dKemvQMmRquriaolboA9vL1AeKVoS3p9OYFt1OzKuaJHsabN08NmC5uWsb4Nt0z7m9",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 291387,
            first_name: "Зар",
            last_name: "Захаров",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/Fv-EgosLMK9f96_e2ImiS78psNh6thknCs7FYvVZ4FySXgwd5QMUSPaQThQjlb-T2dDtC4JiyHSpMXwiHlwxPqVR.jpg?size=100x100&quality=96&crop=156,40,808,808&ava=1",
            track_code:
              "e7c1434bon-yG8nUblmReEwZs6b3bJmVCm3WdavNouISgE6c_6rDHNF7yIlmWJspQugKEMQbjedj",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 398844,
            first_name: "Александр",
            last_name: "Сергеев",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/Y14R5gRmGaZYNmHQ-4Nr1FsiN0hZu-H9fZpW768FvQANa14KtYKMPinIORSNWCX9tMee9TSQ.jpg?size=100x100&quality=96&crop=181,29,634,634&ava=1",
            track_code:
              "67eacc22OQOmyAaF7iDMz5roVTId9i1f8xaNW36VlBLLL_4o-t5YYJKsBI3gesqalRnshC6BOS2a",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 512360,
            first_name: "Diana",
            last_name: "Arakelova",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/2xjEpc_ddXp_nwmD-KdoOEgMP1Z61hjN8qcQ_zpiLVI9iH5mkIdjpJE4LaFg_w6qmkuVy336.jpg?size=100x100&quality=96&crop=0,0,2048,2048&ava=1",
            lists: [29],
            track_code:
              "7403e8ecbD2uMyeks7DQcRD4cerTDWNlNo9b3S6AdpOGUm0PNdIaWvZfIf3st4sTHFGYHLgiNREyi0fSOK0a-g",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 841386,
            first_name: "Юлия",
            last_name: "Шацких",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/2vkkXJHd1Hl129US2WDzHoauDEeFG5gekz1ptvNA3AjSQRGj3ciK6LrY9uLuilGMFFMfxL6v77paBRSpqqXKZrNf.jpg?size=100x100&quality=96&crop=278,0,1911,1911&ava=1",
            track_code:
              "696a4672SivR8PWgbr9t79OB6QXD7Jn3G5qCaqK4E_hYH62blMkrSLLOqPdtv2Ds3nBQs_CbjYVy",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 862876,
            first_name: "Андрей",
            last_name: "Ваник",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/ig2/ZInbp_p9I0pNCFKFzqkyNLTina8F8AjB2a-DYW5OEEQDfMcEYKJSxdcH0kLBlziHjORJfxPIpagido1AoiXp03hL.jpg?size=100x100&quality=95&crop=288,84,1364,1364&ava=1",
            track_code:
              "636f0931jql9zZ6A89Q4LXwbDbmNpgNZGgr2z8KNjcxUUmOUO_7vyk7zkdWniD99duq0D77RFytz",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 894016,
            first_name: "Сергей",
            last_name: "Багаутдинов",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/48uHhkixgk0jf5bXxUjuoVhvxR12Oq4O4DrVlEDwUNrfYCPub2x6wfFT5Inpt-i1TuRPe7Gn.jpg?size=100x100&quality=96&crop=497,0,1147,1147&ava=1",
            track_code:
              "9e36cc66cXZFsydlL21YIUnGgwPxNNc3t8Rei0oYf-LL6W41D8cQFSTRKGwvaF8uQjc6tcJDw0Xe",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 909197,
            first_name: "Николай",
            last_name: "Пойманов",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/QzgOEWvI8VoqIbpEWCCW4omxGmyq15c0UAuUjaHudjHO5ITXNabVN2fg1x7u_JSivKBxWfxw.jpg?size=100x100&quality=96&crop=0,36,480,480&ava=1",
            track_code:
              "f926fceeSY18ji6sZbaR7aB_DXLFIaQbb_yDahH6J8gWGmP8SvAo7h25Lvlqv8u5qI60xPZWsGkG",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 982562,
            first_name: "Андрей",
            last_name: "Шевцов",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/ig2/5gITxQvrl-LbPWu9C4V7WjZDMcOYpIwmkKyh3PbvZFait5Qy3pAgPIfK9WANTQKjFudzBEECJBrZQ-K4Fts34y03.jpg?size=100x100&quality=95&crop=585,793,843,843&ava=1",
            track_code:
              "c201e1cdfYRfxKTMyUI_TWqGoQfY4csumbBBoGCudaTIfpWdOzoc52nyq8eZQj1PY3cYseuW31zw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 1163133,
            first_name: "Евгений",
            last_name: "Конников",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/gIUgAUhuziNxzdoQeHo1jw20hG7wmRP9JydHQNd8LHPL9uo_R1mzeS2ysYzqt9KvTUFe_zXt.jpg?size=100x100&quality=96&crop=0,495,1620,1620&ava=1",
            track_code:
              "72e7eeebqgonHcFcSQLV6FjqgiCHNYXXP9D4jmUr5XlQMB9Tu-LLaRF-wlxGAdLte3A3ha1MhtdWtQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 1469921,
            first_name: "Алексей",
            last_name: "Егоров",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/8_NdY9twOBSElzhXotUXWiZL_96qmtq-hSvkPjCtzhSr03P18im_IEfPuBd6XLYw5dUavR57.jpg?size=100x100&quality=96&crop=0,69,1026,1026&ava=1",
            track_code:
              "8fb4c6cbOufJ7MqEZBTJJ1wZ7N0x_MsOtntam_Cu-Zg-uMDAsehbhKjbn4ZqSZMlfINZeBuFyA7fHg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 1502690,
            first_name: "Сергей",
            last_name: "Петров",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/ig2/tYrMuaxfXbuIHWbPSy9JK53LkuyJdnqhSvie6dVRRfilQUEufaOb3iif9uUsYkAB2kvXyLGZj9mUKgLTwiuGC8Jm.jpg?size=100x100&quality=96&crop=280,733,945,945&ava=1",
            track_code:
              "99b9e6bex4HvYofDS-m_P5_clFkb9v5QP6-IU1-J3i_7bfD0evGm4osBjpNL4-pjvUYh_DGP_VBWyg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 1946860,
            first_name: "Вячеслав",
            last_name: "Налатчиков",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/oNuCib1qVBBnTJgN6EjPiChFMDJ-xWruUKni-fHjluwT5wc2EtdYebGBxjHhrP4D_OVKn6o1.jpg?size=100x100&quality=96&crop=638,0,1920,1920&ava=1",
            track_code:
              "9eb86d73ICGOVe76h4WwMOvMFzVbw8bG02q9zaEvog3iomSpGrtBQrti6PqFg-k-yFaikHG6xca6Dw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 2196650,
            first_name: "Алёна",
            last_name: "Пуговкина",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if2/muJvWVo8DhhZaF37mljy5Ld2NvQrxB_HOO43XKc6I5CHAkrYUQipdj7XKZmbUXCQZRnLVgujtjX9qb_xwTeeibDR.jpg?size=100x100&quality=96&crop=413,110,457,457&ava=1",
            track_code:
              "cb03f3e9jKgIlina8CnDS-xp0Az4NUYCiFinCg5_YXU5BPcthNvty2qkfYqoKJMYyPNlqdJMRQLhPQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 2322500,
            first_name: "Дмитрий",
            last_name: "Егоров",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/f_U4MrecCsD2kcvD0Wf_ikeE1peNGXfunt4J9kYaZzXOBlZ3FBDamuDprvxd6me4tl7-Gvgj.jpg?size=100x100&quality=96&crop=25,54,272,272&ava=1",
            track_code:
              "c306e4a7T8mL1PCIahOOKW0mWeKSoXLDO_228FYTLdHKtn0PKzQuqrvkp4JqQop7SLzsR7jYccNSmA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 2503718,
            first_name: "Светлана",
            last_name: "Пурик",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/NKd-OCpz72iKlm4tvcLf0M527-_udqAiQ9E5fPQKy9gxHuEfVrYWDSK14Nm8bYhFyoOO7-9-tjY8SFQlxXk4fhyO.jpg?size=100x100&quality=96&crop=3,142,1433,1433&ava=1",
            track_code:
              "332a64957ylgpTkAT5LKHEBM5q0Uxdokf_JPfjXBcm5gAXnpvqCOSljHbgAcl80cbtZTCD682SQWlw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 2583876,
            first_name: "Толик",
            last_name: "Кириллов",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/EpwWgmaMx8kPFGdLzcYUKR3ykfcjvaNxmOM7z5VQpbjAVCNTj7rrFMMu2k7i3Q1gsPw12EDWjzO011G5gGMJtqgI.jpg?size=100x100&quality=95&crop=2,2,961,961&ava=1",
            track_code:
              "4a40cf04ONdDyuUZwsBqM8jefyCtEoNs2EHTwCtQ0YAxiO0ZfCBZtHqp7h3JymJh6UTKhYdrgGyxJA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 2632997,
            first_name: "Роман",
            last_name: "Дворнов",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/csJtuyp2XPRp8kTmeM7_WthoA3GJudpZhveSQy0Kx8Aed0ipAxSWgYBPTEyM4B3ilZ-N5L81.jpg?size=100x100&quality=96&crop=69,32,864,864&ava=1",
            track_code:
              "a0d4433doUCqHLqoym7hId9Q7uPiT3jPe5Ru991h2a-kV7b1iNjAI5srv6ucbegr8MpbRsg2e88S8Q",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 2808726,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "6d5ddc46StW-tFMuUBXnZF42QRGUKMKQvnFLqOYOfF1eP0Z-EPsrtomBBS8FHrJkcaz0tL5RwZDXFA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 3076884,
            first_name: "Таня",
            last_name: "Артемьева",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/ig2/4CmNLjPRT3_EG0lkoyp4SI1EfChEJMWbKP7mDrMeEbWEqQJC9ttBnldBzyWObRlrpDO0D4aMDZKCzOi13-jr7Cul.jpg?size=100x100&quality=96&crop=4,205,1724,1724&ava=1",
            track_code:
              "c5ea8051S7HfmwMGpVtloyC3WtSWyMNehnAvcpj1ZzVtpeOjNm8q0r7_VQaqD2yiDi3vcbyxwF7vFQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 4137576,
            first_name: "Магомед",
            last_name: "Кандаев",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/croE04LTyOVeItIPR_I7whNArNJctl4eNOT71Ch6AAM6f5Dtmb_Q_RnOm7qdUK1P4MjxpbsT.jpg?size=100x100&quality=96&crop=4,5,950,950&ava=1",
            track_code:
              "7e02c491OTozCCxM-ayaAgPThnVoSc_gGAWPAFEE9K9akx2pHB9YWQo2L02o_p4GLkkz0EIwzOBxYA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 4329391,
            first_name: "Андрей",
            last_name: "Кантеев",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/BoPv--ee6ImYxg8JWtb00C5UM1_t9jJKr76jpdpX6XAkTILLFMURqnYmEzEhcraqJsRkhhX5u8sM-2fMGDrRN9q3.jpg?size=100x100&quality=96&crop=0,140,1284,1284&ava=1",
            lists: [29],
            track_code:
              "fea1d63aOsAydFxupMLwX2EdrZrf8Vs5Gp43l9JWy2Q5wIB-DGNMpzpODjqomPk5erVGbL7bBHp1ljiBymzVDUo",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 4474885,
            first_name: "Ольга",
            last_name: "Уразлова",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/UHKlvKnrWL5oBwm8w0aoioZ1LBdNjgwLYtKqcezN3WaVJs-FR1EoRLb7hmDeAurYS429qGs3.jpg?size=100x100&quality=96&crop=0,136,1080,1080&ava=1",
            track_code:
              "377e5f5bQcLgrSpBPw5gXfGJU2bUtdQHS8lKkQ3gsUuTjpHIU-UgodmTehQ5CGBV2RPmw_7M1wcirA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 5056243,
            first_name: "Михаил",
            last_name: "Мищенко",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/oeCdmOFTdsXgae1XdVAcMk6QX7LQyPVZHcwMEVhaDlawjFbCmXiC2LHmmUdYFJfKA4GuBALODElqGUnfX2GZvSYv.jpg?size=100x100&quality=95&crop=188,0,561,561&ava=1",
            track_code:
              "830f3949vclfDutXf8uFuXbuVnUlUYYW0qj-pQmmXfgZrqSPd7Pcqm05uwR-z9W0W3Tj0A8ohRa7zQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 5081536,
            first_name: "Артем",
            last_name: "Калинин",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig2/p-jzkhQUSzk1csrv5axCOF2rwZ9hVvj4OTXSSCpoOGH-UiP4VVDp4Lyks2pRxpUHB2BPOiHXPtzBgWTqbrKQ5Su6.jpg?size=100x100&quality=96&crop=297,244,679,679&ava=1",
            track_code:
              "7da538b3tV-2YVJOHuQ7QWqEUPBMryWaFFvMBlzZFoATwGUmLN7UPIVSXkgRsDhFQx7lVWbWJpp9Pg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 5701184,
            first_name: "Владимир",
            last_name: "Богатыренко",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if2/p-xPyljkJwLUYlqK3xwAp0Fs7zLIh6IYB0lax6U0GtXxv0ECJVHjiHVnG-E8f5Lzv2SVF5Y3eThDILv9EkVR4zwl.jpg?size=100x100&quality=96&crop=145,0,685,685&ava=1",
            track_code:
              "143dfa16NVXQKLUte1ryTbQf4Koi0kN70B_71bGQnzHIn6w-jkdUNrQft3wuCPZHoIVVDwirQHu5eg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 5874708,
            first_name: "Гоар",
            last_name: "Аванесян",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/meEnE_4xygRTQXxYH5on4ZoJg35GNmlKfqzsR06sROJln-XOga2Kqyy9hod3WSs_FLfrX_4Z.jpg?size=100x100&quality=96&crop=47,47,379,379&ava=1",
            track_code:
              "fbaac8f4A494FA8m0UAmP7S_z6zT1MWx0eS-JVNuNCkvPCgHlJti7Bx3DC7fFnM-rSV6CfmtxrG4gQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 5970353,
            first_name: "Максим",
            last_name: "Матюхин",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/Yfu8MfDSyHDsi1SCxxy9TrERpp8L96x0fbi2-x5X0kPmoZ2L8qZUysSOEk83FqacqLW9ww.jpg?size=100x100&quality=96&crop=49,324,1487,1487&ava=1",
            track_code:
              "a48316b9EyHCsKMgWJpnChsWL7eYhWXd4h3qsLVHvr_hZRacmX1yQqaCpCBfmGQMCoyaErL8Zt2LeA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 7723602,
            first_name: "Мария",
            last_name: "Молчанова",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/cAOVM-aYhoLAbRCBdnt5zQ6kg3G7s6yPdNScUwrjs3bw-1ikrsOk44zdRZmkiEW9hYwLi_kU.jpg?size=100x100&quality=96&crop=1,0,851,851&ava=1",
            track_code:
              "09eb4b699TcNDybujcDx7qv2YEH-rTF0LrKcecobwFQnrzzCrtuUVDw5c7-Gwv_sumzV5NTUMnRH1w",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 7745201,
            deactivated: "deleted",
            first_name: "Паша",
            last_name: "Решетнев",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "50db864c21LCw_yTxNgWoLeoIt5L2zhw_02aXUbcTDn3JuQZy9i6Mffx8pLF1RanojKXe2GiO3CWKA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 8079066,
            first_name: "Макс",
            last_name: "Рощин",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/xEKFwbCv5g6qF6hantRvatYs7sDy09dI9OYwoPWMD6yWf3qyDbWTtUOXNlbb4b95q4qHoY12.jpg?size=100x100&quality=96&crop=77,77,615,615&ava=1",
            track_code:
              "4aff33b182_zESDO_sUTNsCXyvu1WR-ZRQbLbQ1CyBtemdVqWEaSDMUgL8iqyxY30w1_Xp8gHJksYw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 8123123,
            first_name: "Женя",
            last_name: "Малышкина",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/UAZXMo83MazIV5BqZMXW77ksTq5jJH6yW1Am70qfiTx4ExspL0iVzOc8bBx2N8TinrcB-yGv.jpg?size=100x100&quality=96&crop=0,0,2160,2160&ava=1",
            track_code:
              "d689ebcapBN-mVj-lewqSOFzBTMantYg5-BCuLyrhnPV7zZn0YbFcB-rVvmQ5ilN9OmwljDn1SCOhQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 8270009,
            deactivated: "deleted",
            first_name: "Дима",
            last_name: "Гордиенко",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "05c1a473280TS7o0ug5eGPCpyYfUjczaUiv703oo4dUnP937P-e6rnB64WW_W1kd7jN8Iv70z9o7Tg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 9184133,
            first_name: "Денис",
            last_name: "Янушевский",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/hQIgJMpcigLRmvx2qUu0IXFo1Nv9ODz5AXp2JPz0auGah7j3Gv4CSYIR98ubXYI-_us5wFmBEsvxk5VKaosTgG2l.jpg?size=100x100&quality=95&crop=510,0,1705,1705&ava=1",
            track_code:
              "d4f45a287n6y6qjQNUWaKjKvuAkszL04k5SHcMGYwYZJ1lMBykuPHYHeoIA6QZsqKTUNrAa1vjj68Q",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 9487131,
            first_name: "Георгий",
            last_name: "Войткевич",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/XDA1zpzg6FrIBSqPjTViiCwak1riCh3EMLnHYm5A704gX-_kk6RTqz33Yt_-hjBxJNhvT9IW8RyvCk5pejRFyhxg.jpg?size=100x100&quality=95&crop=147,255,1296,1296&ava=1",
            track_code:
              "a91ba481slMljGue6ai3pCGaifxOFWqvHmqxvKuplzCZ1tMeHUzTMByzZZ_h-rehOQA8WWRsaa93Dw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 10010828,
            first_name: "Сергей",
            last_name: "Рубец",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/ig1/EHhr0hmueako7HHNxb-RfqkZvaUWSNCJ3Jku_YYxpAWXt6elmrkSSikKMhmd09c__idikU0P.jpg?size=100x100&quality=96&crop=0,0,2160,2160&ava=1",
            track_code:
              "7e83debdDeL3tHfwodF9xtXx5JBqW1BkYGbkqkyN3riIKOnWIORsgcWEf_Gg2CyazVU6OVM7XXN7A4o",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 10256285,
            first_name: "Артем",
            last_name: "Кравцов",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/Hsd43WmYJOiecRVXNhKhySK7VXMtps3YjXQc-NoedUIfWxutA7mtZAu-sGmxbhkd-Us2vypY.jpg?size=100x100&quality=96&crop=65,20,288,288&ava=1",
            track_code:
              "074dffc1jEckX2jAqqTUjsjnXiOyCsURTX6WWyVfgg648QjQU-DtJBFjbsb7ptaK206AiotqyAZWG_g",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 10309773,
            first_name: "Евгений",
            last_name: "Юдин",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/UqaEsXZlVQlHAyGtuyWcSHI7CfNrCrT_X55Vtozf8aWCC-97O-zvRLfeaxwjOlSS3wGvIjbT5qTYpH1QZDvtEObh.jpg?size=100x100&quality=96&crop=208,4,867,867&ava=1",
            track_code:
              "3d01ab24bJy_tS5ugKQ41179OWQHqQGlUZ-5r1xeTp76kpj08icN_93bejzS8jnURVLnzT7JDLJK-tc",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 10389705,
            first_name: "Mark",
            last_name: "McFly",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/ipaWrIffQ7EIIz-2VVtgT4ZHNhndRx8rhRkes3152DoCnS9zQdoh4tMQl_rt3Dg9Q8Y5TkjKzmMIv0ncEbQ1paR8.jpg?size=100x100&quality=96&crop=0,0,1080,1080&ava=1",
            track_code:
              "6cbbfe90N9_RmDjMqhHF0WEY_Nd3EGg7G1-S-D5VXHxdHyMG9xRWvODzasqrG8jSfLEifk5wZSwAOvw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 10852349,
            first_name: "Эля",
            last_name: "Селиверстова",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if1/VG16Cjkbt8BN0CLM8gaMN6jpJZM7td8EG-lDoXGJ-l-MC8PNode7AUQ9J0olHagxsAmr8Bk5.jpg?size=100x100&quality=96&crop=86,590,1152,1152&ava=1",
            track_code:
              "f0e78bf3ZAKi6Cndz7pzPGf4OYMwG5JnwWr-XfGx6LmpCX-dOwUFYZOBIdvB6XdrfV3nKgl7n3DaD5A",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 11210081,
            first_name: "Алина",
            last_name: "Кныш",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig2/r4W2RIwwKXbUNT1ktqJ06SmbEtex_O-dwsFhFIyYK7EliH-MZZAqMVUoa5QtN_gp29HxBQ8zD0cwhv2APx481Z6E.jpg?size=100x100&quality=96&crop=68,124,1300,1300&ava=1",
            track_code:
              "68fd6f26IBin-CWqDYKdUmPrH9jwe_4iyD3tgkXnafjLBabJNaNBe5DBJPgHgZsHdEbBcckb8zXTWIM",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 12285178,
            first_name: "Татьяна",
            last_name: "Мельничук",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/J_8x7CHgw0QiqLxhN2qI8WVC0lP8tCQ_uMiodXEGazog71XrjozHmj6HckDZigAp5x9EEnh4.jpg?size=100x100&quality=96&crop=386,545,722,722&ava=1",
            track_code:
              "bbc81452XkM3ZKGHYL_tsVST12S31SC1gHX-o4G4Bd-VAp0jE3M_IAYNptMxtOi0UzcJzY61LaKbEJA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 12450732,
            first_name: "Антон",
            last_name: "Ивченко",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/9LLznXhMPIen-8RWZbpxS-Hy1wN1LmRvRahRAlq8TfkTLZZOU5p9fY8XGNJb081Dg51-KJ6v.jpg?size=100x100&quality=96&crop=396,42,1224,1224&ava=1",
            track_code:
              "a8445a45GsX69SHT1A6RX5iJsvsxfGFpxtlTqFsWEy9z0FOWDzp7pp6eddLTDpdYmidsUggcbH7dvD0",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 13986109,
            first_name: "Роза",
            last_name: "Аракелова",
            photo_100:
              "https://sun9-53.userapi.com/c1438/u13986109/d_2f4a391c.jpg",
            track_code:
              "e55da22010vAk303Xb0SeCdEyrS5ztJEYE89t95S7YgjXQpQJlG2KPeqLWBQshB_JeEUHYCu31N7KlM",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 14132555,
            first_name: "Наталья",
            last_name: "Норбоева",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/AL7x1Yn2ewhpSF79Rvoa2aEk7qs2ubF_02oQW50Lg721pN6ibKDmNjxYSh2Nh3ZfK9xb8KTk.jpg?size=100x100&quality=96&crop=24,102,978,978&ava=1",
            track_code:
              "fcc0528aLodm96a1dbNCkqv4-FL6bGEYM89i1EQpW8-giDB_P-9P5FHJ8bl2skeRrVEm-8MMbA8oqgw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 15743482,
            first_name: "Олег",
            last_name: "Лем",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/c6-R3qY_RNk7sVNEYH-Ds0Rc5jhpZaUfD9ZP4XlshkITntTchLOKHLT_Vy5-1RNAeqbFEfZw.jpg?size=100x100&quality=96&crop=307,295,501,501&ava=1",
            track_code:
              "2f7513cbPlsGWTGNBuLhVWpKRf1pKFVii2EM2SrNPJq0dZE682ZfODBkOI0A5bZUZuSbVFBIWHWQBGI",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 16319094,
            first_name: "Карен",
            last_name: "Арустамян",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/ig2/rNpRwc3zJ9y4WpfGWBDmvnO-JNW7lGZo_hAusgfP45sezqVdOYZz6zh9WBfUHL1DCjJVHyZMq3K_yGEOdJfLbP19.jpg?size=100x100&quality=96&crop=174,432,1040,1040&ava=1",
            track_code:
              "cfe6611edQt5HwgneSc4_DmRuHG959n4MBjIc-AvpUf0AcH7jWQUaEguWiN_cjD4NTlm2ISH1O8rfaY",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 16835476,
            first_name: "Kirill",
            last_name: "Fleki",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/ig2/ZqNWgEE7FDWGxAuhPjQJfFQxA1C6c1BXd4HJYHH3e9ZqJBbSlcLd4UHqDEGAVIhiEP0cIfwmn71gSRsU6W2G44TU.jpg?size=100x100&quality=96&crop=360,0,1917,1917&ava=1",
            track_code:
              "96152f36lAa_DQ9PamHB5GqC6xnPupTyhsQl9oGidkJB9S0AGJn1ZY8zC00zYMHlayg1sPbameWdoUs",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 16913487,
            first_name: "Сергей",
            last_name: "Осипенко",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/E28xFDcJnnfW9WNFOj5hh7KDcrcWD4Vyv0BoGkJ4uMdXlFC_CoEMwAKLtenIyKpxUnFAEWQK.jpg?size=100x100&quality=96&crop=381,63,1218,1218&ava=1",
            track_code:
              "3efcdcf07JhhkuiyeMVbXplwGld2ZW_WOC5BCOLRuUwCJrEvHGmN-1Gt67wil1BaltvE_k8FYsEjSy8",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 17439385,
            first_name: "Максим",
            last_name: "Студеникин",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/ig2/JD3tcC_WZXLBsGNUvFwsmMK1S9gxW1yLdQC-oMPF2TekhzAfHUHgkLYTyiUi38gzB2Kfygmkv-DfanIEEg9cbf49.jpg?size=100x100&quality=95&crop=0,324,1620,1620&ava=1",
            track_code:
              "f8448b64bb1NWWV_QeTk1WxOMlXm8HopL2MtlJpabRJs_E1qDewM3n80N35Ntb7fbOfs_N-Qdz40BkM",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 17943092,
            first_name: "Алексей",
            last_name: "Юшицын",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/BaW7fHS8s9RGfC3cyAD62VPK2aGVmXwamrc3dxYnzZffJ7ywipQORrRajpoECYgkoeW5gVQh.jpg?size=100x100&quality=96&crop=22,240,1419,1419&ava=1",
            track_code:
              "53947654swNljtZrQMYUxh--d1x_QIih8YbnYZqkoiSn113to1fSYFS1hjgYwBLAHxCp9UYghbbq44k",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 18242055,
            first_name: "Кепа",
            last_name: "Кепасыч",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if1/oC0ZWS8oVCMIgoL0KhkOUZOVmTL6nADEHU2v0ybOZpe66_f904t8Zdr6AgioZJavDRPT4E1J.jpg?size=100x100&quality=96&crop=122,24,353,353&ava=1",
            track_code:
              "69b10d45wDfyKpka8j9mtvewVYEq8MTzOzlfUMHs9WD3yXb9EgmhVMsVkBLxb2Ww-BmLKBOQyeQgXDE",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 18690391,
            first_name: "Игорь",
            last_name: "Гусев",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if2/HjlJYIk5SRetnfLC2kyzLHpFJKJDZu42vHwYSZ6W0W3F76Cc_gIJa8L6s4kvt4RmHUOHRALEi4zotsbgkSpzpuIn.jpg?size=100x100&quality=96&crop=136,136,1092,1092&ava=1",
            track_code:
              "0d0555b3NSfL0Nyp454b_8_mwGOV8hdQge4o4w2CF8KIigF2SKVURP_u36fhwhL-zUseyqySGkeai0Y",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 19125105,
            first_name: "Артур",
            last_name: "Шайдулин",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig1/eSU6Bc2qNTIiU0nCS2ImZXrCavaycxLLO2kRDsB5rXQ_IpnBW_lIGA94snpBxdzRXHfVKk3w.jpg?size=100x100&quality=96&crop=0,202,1218,1218&ava=1",
            track_code:
              "8f14cdf6BAECVhTeEU7P9HTUXxjfNXHSppQw0Bz5FsGLPQvm4hVlYjdmHIQQS830eH2BseZVfMW98V4",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 19492410,
            first_name: "Анжелика",
            last_name: "Аванесян",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/o1vJg8IaoE1dAxP4LM1cBNsiL9piU7afWGR8ColGnPMQPa7IYE1ozSMYIYSZ7NzIbZqedUzWJsp2T6eL7WEmxXA3.jpg?size=100x100&quality=96&crop=0,490,1333,1333&ava=1",
            lists: [29],
            track_code:
              "46f306e3caWKFn9sR3CFwAnaHBvBfNufsMBMW9iCFayuRMgyDnQHwtAsJDERcN_0PHf966BXidzpo09e2bYct90w",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 21109734,
            first_name: "Евгений",
            last_name: "Клепнев",
            photo_100:
              "https://sun9-26.userapi.com/c1667/u21109734/d_df3685a7.jpg",
            track_code:
              "f049fcf2LXQ54fIj2CNT6Sk1sgooCOoji7Bl9oyGuVCzJ3B7Gp1MFwzY8iXfJQzrJJ1soxFo5zSQ1Qs",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 21766728,
            first_name: "Денис",
            last_name: "Давыдов",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/ka2aJfpGpK7KBimSNPpdUs6Kp6HC6HmpjYLjNODncmQajpGVZ160Z-HBAj1tJ6kqzi0kA-Tf.jpg?size=100x100&quality=96&crop=241,207,1044,1044&ava=1",
            track_code:
              "c2b5c718j-2-JZ9GOeVRc3ElfLtWQz6Gm_1BRM5ln4us69iz7cDujosbmhZs4VYmfIGiEm8jM5GAmC8",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 21782880,
            first_name: "Евгений",
            last_name: "Зеленков",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/CT1MMVuLa6POTYubL0EYAX9UI7FXON-fuH2jK3RKaKjBB-imbL1qMxZXTTNdJePMfktqxo8u.jpg?size=100x100&quality=96&crop=79,285,412,412&ava=1",
            track_code:
              "a571f55ee6sAxLmk-5MXeMY22x1C3f4b5UoGNE0sg-NObnB_56sayDSvvKKqmB14vpoFtHu98wz-L2g",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 22456829,
            first_name: "Максим",
            last_name: "Иванов",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/szr4ZAJa10lqhr70cRiz522E5_khhxSY6VuGvZgWO41T-DqIjLRDdfyhs6GO47Lo8j8s4Q.jpg?size=100x100&quality=96&crop=144,151,1152,1152&ava=1",
            track_code:
              "e4827670fIYX96_9d8Fpx3ilOKCA4ccVGPBC44-W1nNtFUZV__Qd5SWbr_0hl2bLCwDmCbmBygIDlSw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 23486044,
            first_name: "Николай",
            last_name: "Карецкий",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/xX7G7TbFh6bPfGR8yDIzQtMTTGOrkYj_CZl5B63DOUv9UVdJ1j903ipuJVMFh2V1BY0e0EAz.jpg?size=100x100&quality=96&crop=0,0,1240,1240&ava=1",
            track_code:
              "42130ea8WC204QH-RkVP7Nkom3Z11QenCW7m301Flj5Fs-9fAss5ToyNBP4TGU3qr4BF30y1CrASC4g",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 23635228,
            first_name: "Андрей",
            last_name: "Иващенко",
            photo_100:
              "https://sun2-4.userapi.com/c1434/v1434228/f/TKJ7qKEjIWI.jpg",
            track_code:
              "7f67c9f1uuh77m92YF_ZtN3VfAHjim3cKKenX4FHmxndmSwC7aPbi0jQbX0yW4-2rHGiqNrqYMszwsk",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 24443780,
            first_name: "Сергей",
            last_name: "Андрощук",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/iUxUnLX5ADQrFesuK5YOgnro2ohMAlSz0P4936BDt7BA47LdKQiIg5JGYcR_6B9pBAwHK_n9.jpg?size=100x100&quality=96&crop=0,0,1280,1280&ava=1",
            track_code:
              "ab907091OIR76lh5qF2RaGTPavQYLyIcoM0KtKWY4_VCG8cSCutZ50vRUnWvX5BnGGO0XSFPLwu7qGQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 24471579,
            first_name: "Jev",
            last_name: "Gordon",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/HSt839Knv5NHUULHa3W2Hsrsuqd7pqaQvIyBq3iKpS4Ppi7b9LyVbYg2p_04x6p2uUGwErX2.jpg?size=100x100&quality=96&crop=33,24,546,546&ava=1",
            track_code:
              "055e1080bTSSC_LBY2lqfxHM4pJdTSmo2U7tpJq4E9PoZ5NMlUAMV6Vlpsdkbz0pY2k8O2QtJL_CK4M",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 25598967,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "7086628dVPmVmK3RoZv2dstgM3qndh1UpwpW7BkdBiIg4pth_Rw1mqCnrYamkPl7u8vt054WEEO8bzg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 26291131,
            first_name: "Дима",
            last_name: "Кахаров",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig1/UZCs5uVOWnK2gRocDERSOKcS-ffeYh8q8VCiL7M-HYZJuh6j9fbe7Jlv23JUnTJTBf0NsL5J.jpg?size=100x100&quality=96&crop=402,84,1681,1681&ava=1",
            track_code:
              "d6c3f15aqlfL4C3Zg60oYieluajjwZFD2_-mk_Ym88UqA2WRWnbLNPuOfdmE9SplUwhnAdqhnFTAmsg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 26395598,
            first_name: "Алексей",
            last_name: "Линкер",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/ig2/HEObBAjdSkSBMLQohnTy7knZYSKW4r57aD88Zg1rkZRsKqffQKfTCFCCmug2k9x-kJ6Hr36nTuJHYBGauJ7imF9c.jpg?size=100x100&quality=96&crop=0,46,1077,1077&ava=1",
            track_code:
              "78a059f5aoVkPgtLZxiCMGEPss_dB6j-4Vav-NCBzF7twecrGoIL5lQPC0s3RIVmEKtsZuRnpen6M8E",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 27055473,
            first_name: "Дмитрий",
            last_name: "Руденский",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if1/hbbySn-Kzs-bcmEPZJUaL5U_ySqZgbKMurFzDk1ub5sNuGudqhTohL_rbWmZDtv95-8FQgKf.jpg?size=100x100&quality=96&crop=388,192,421,421&ava=1",
            track_code:
              "c86b3fd2QnX_BIwg9kgMDO1nRKsRYq7LrWGVj9XdesYHWAkkw6UjFps8hnajTg9Zk8iaAigCo9y2BPs",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 27837868,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "9a1e29c6K0fchjtaOD7vjbOs6X-knP2TxNkhjM3FsHg29KkP2QVKJO7sbQ4xOOmFzwg31p388ITfvE8",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 30320231,
            first_name: "Анастасия",
            last_name: "Абросимова",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/WQQf3r_kmh9GRf5a1TTFyG0V-EzbDBc6zUZFEhSoV4PezY-sggKLTmNcpjcbJRK2tIDzN7S3-YtUBpnhhDEoWGZu.jpg?size=100x100&quality=96&crop=0,102,1390,1390&ava=1",
            track_code:
              "878f5b0fncLriaGr4ptChlEC52qs1kXHQZf8-byDkBDopp_MSpP8odPi8fjonUeDKa85w5W2SNBa8pI",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 30607863,
            first_name: "Эдуард",
            last_name: "Айриян",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if1/k7lCPTi3mTx3aIxHIx7p8jzghqoZ0zT8Vl-S54Cnh_4zLfunKriTbo_ftOE5I0tt8i-MI_LK.jpg?size=100x100&quality=96&crop=0,10,1237,1237&ava=1",
            track_code:
              "9ffac0efkcX5Ae4dpLA0-9MkipZ5KvHFml54N06N4MmOqoznhc7wps465U6muWX0qYtUP0BK_NKBOxY",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 31319634,
            deactivated: "banned",
            first_name: "Галина",
            last_name: "Аракелова",
            photo_100: "https://vk.com/images/deactivated_100.png",
            lists: [29],
            track_code:
              "e92b8c00vQVZQrBe7heKcN6nPCWRuOZJttI-9vB_m00b3zkibJfLYgd8sAG5RNJDmwjV0viYtgjrsT3z8UuSVmir",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 32952099,
            first_name: "Андрей",
            last_name: "Лейкин",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig2/3Zp54qcxllBq_DMoUZ7oaXyCpFAwtTq_sZr3ZDqRDDZ-imDF5G4Ob0o5jbdY7pFVrM_DhfJBMGJtloZfmVapKcAW.jpg?size=100x100&quality=95&crop=408,323,663,663&ava=1",
            track_code:
              "b2d37d36XHYllI_gMnIcW6Twuk5vD_E_npgvXdhYclp02l-czvU9FUevjepoIxwI01Vk51Zv_CiF_UE",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 34101638,
            first_name: "Игорь",
            last_name: "Волченок",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if2/du7VJNyUM6-EBR_JajP1ijCurZzUmfnSMtTyosgDZSTtMzHtfBVXglilWpVSiaYfoQ3WwWDFD6UUaKhMH2biRUei.jpg?size=100x100&quality=96&crop=556,264,1404,1404&ava=1",
            track_code:
              "6480ac47EVB80BGa-kC-h2-BBV-kI0l6_ogN41hMxXWYRQW_9-dwMx--E5eoEb6HEyXb9p1DRG3l7WM",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 34623318,
            first_name: "Дмитрий",
            last_name: "Соколов",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/U2vSj3Qu5N0IfxCUJCQtDh2thcZRUG8ZpPPR66rjSUw6Px9U36IF4VldpMnjL11tbeJvusP_.jpg?size=100x100&quality=96&crop=175,344,1401,1401&ava=1",
            track_code:
              "81abb49c2ZIK75VmMNl1GktNYZT5MFG3wW6oDYeGSAdB2vUzNIm48T3RkzE-2CRPKum_PcBQXKDaC8Y",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 35818690,
            first_name: "Вадим",
            last_name: "Дермановский",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/YUOPTh0E0_8p5l6WvAthxtPnihrV11qmuxJS0OKayCtDYebc82r-kfY7vz4xzmYzCSewIQ.jpg?size=100x100&quality=96&crop=0,0,1155,1155&ava=1",
            track_code:
              "fb0cb520yYDccFRsADkyd6aYwNM5y-BvReBZDXu7Ee86_BF2C9Ko4-VJUGAMPjknzjQeegCr7XhehTc",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 38748832,
            first_name: "Елизавета",
            last_name: "Зимакина",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig2/nu0zMl-QqI5XC7mUh4MYg5dzWCIa_Tr222aaj8YS2MieLtcAFadMmh420jrqnwu266-z_VyK8zbMA5Sq4fTkhwKI.jpg?size=100x100&quality=95&crop=0,474,1368,1368&ava=1",
            track_code:
              "4eb6a115gpBM_d3qcbnX7bcmfHPgFV-ZpCLtA2TJlnOCpSUPc-Dj83XF2LMjut_h1oii2tl1Uo6_R4M",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 40284699,
            first_name: "Борис",
            last_name: "Медведев",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/nY-yX1QUR-9_BzdZwpuqykHQuttdPsZGQWiAWeAD-9kECNA2rSivEGwsoX8Tc2PU08UDUt6q.jpg?size=100x100&quality=96&crop=248,307,1182,1182&ava=1",
            track_code:
              "31a7c5c7eZ1rEtqL2riFtvqGFk_5vVvwQV1UyBaa7HuXaHwp4R0Y_lx_2Yzcs4fhkCPI5sDdVudaODo",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 46979289,
            deactivated: "banned",
            first_name: "Елена",
            last_name: "Орлова",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "1bcc6692c-1wkJOl7gw-Zw3oPiFw5KEYgiNbvh6RhN22BstmwWYSjkn8laHjCT9mYU3giEmErA-ZRjU",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 49788418,
            first_name: "Тарас",
            last_name: "Хвыль",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/_EMx8kuExPOb3qjQO0HTYAKbL0_R726mSr45UWdnVgNkAJG8IxI6bbOv93G0WEl9GE13asDx.jpg?size=100x100&quality=96&crop=309,0,1920,1920&ava=1",
            track_code:
              "d555c52a05fzrO3p7C1WxNZHTjCw8rwOMdZFvZArQjnOCPDwtc-y9JGSurHqcV7CsuOQmYmSsRkqsys",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 50238030,
            first_name: "Сергей",
            last_name: "Грибанов",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/wdAO3tKb4Lm3fiaeJMMeWdqMiGFW5lFrtprNIxLCUBSFnntUiUrw9GtUkEu-JvzD6I881WbK4pMQtaEn7TetqoIO.jpg?size=100x100&quality=96&crop=0,304,1440,1440&ava=1",
            track_code:
              "28ad2a26_syVWVYvhGDW1891FPR-zL39tLk9tCNkEc5VNoCNeAmfr_E0VHrTYYiEqtnKXUessOqv3FM",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 51339966,
            first_name: "Ольга",
            last_name: "Корноухова",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/tNXdBBCkLY4vnCUu_tVqsc6Zj-lYO8_iUL1MYyOOWGdSxbWBF83W0ZtD0Zh-D3i3HTbAwzJ1_jY9Rz-i98evZcHE.jpg?size=100x100&quality=95&crop=352,472,1228,1228&ava=1",
            track_code:
              "5e78d3ba8hdLC6aBpTDez0XB0IhxfuhKVf0-wTE9--6aEc2G7dyTdHNipof3M97HJGsOIUge5V1OmFA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 52055743,
            first_name: "Даниил",
            last_name: "Лавренчук",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/mVaA9cvpOsGcZ-3tADng9ySbNTFg1FGuR3LcR4FIj3Uyw3onpgOQy5jtZH4Dks4ZRalXaqQX.jpg?size=100x100&quality=96&crop=0,130,1218,1218&ava=1",
            track_code:
              "0817e437eaba2snZzPzi_CIFbwT5vGdhS3dHyOOrMETmUxw6WacYxezjzYnN-rGpTqqxrcDcanZQEik",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 53481388,
            first_name: "Алексей",
            last_name: "Иванов",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig2/U6PGMnIMwqNJPkMZCL9sGTiZcC5pTYbe5uQNqRF1IuDZFRxFEx8q7rf9iAKtWjyYKpMsR1OPlhfRnDb9QlSA1z7Q.jpg?size=100x100&quality=96&crop=230,239,706,706&ava=1",
            track_code:
              "36d2da49qUnAqcOOfhj3IsvQYnEL5MtNkyYL44AVCkFeGixehKbIKqPFxolyEvMgqnS82DKExlqIQ2U",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 53818640,
            first_name: "Сергей",
            last_name: "Манаенков",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/BPguaLff7OAWAvNWutUsAKIByKoF5EUiovG8iUe7BQoG5JaYTNiSN1aj6DymQUgA1qay7w.jpg?size=100x100&quality=96&crop=96,516,1036,1036&ava=1",
            track_code:
              "10806654UX1dzdLT9jXlZeCDShxzFQzqEgtwHt1jnRqqKvX8XQwwHmX1hdWtZuhiji-UtUp1Af0Jbh4",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 58183820,
            first_name: "Филипп",
            last_name: "Максютов",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/yvnchodWpcSDP68go5QM_5KSjA0XzgK-lOJ5ojYI8yaoq9SGbfUGoq-G6nqW8ChRjiWBDbGt.jpg?size=100x100&quality=96&crop=638,55,402,402&ava=1",
            track_code:
              "a4451780CpZo4Sw6xr2PM5Qu_fQ0aKQkcVzDWVcZK3pISCQ6GZNr9QnRfWPBvIQ7_YIjXQ0IqTNqOa0",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 61843800,
            first_name: "Артем",
            last_name: "Сазанов",
            photo_100:
              "https://sun9-30.userapi.com/c10001/u61843800/d_1e17e34e.jpg",
            track_code:
              "90e7f2ae5j1inn6TJ7t_jHiDSegd4N7Y5W2IL8qPdvy2jvtYPXKHXgOiK5ot7n2AFC-XQSSA08_-COY",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 64575919,
            first_name: "Марат",
            last_name: "Белов",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if1/ShTDrSCI3-JOd7N365E8f90_5SHxs9yiCp5A8a4k0dhjedI02HK5Qq47aMXsTFQbgiYQE5UP.jpg?size=100x100&quality=96&crop=218,0,918,918&ava=1",
            track_code:
              "742f14e9WpG6tAJVnaIVe9NXxAb24-UdUN0QFP8mrOBfxyBWeoM78oOPUlmd9hVxv_Iar8-D6ApLuH4",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 69657191,
            first_name: "Антон",
            last_name: "Вахрушев",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/lSPZdCxvjJLs0cXbHAV1DZPGDwFnNpKBQaHeYKWZFfaXn-Et3vhf1yt85RqIjBJPfY11uwDd.jpg?size=100x100&quality=96&crop=781,514,1096,1096&ava=1",
            track_code:
              "b9cc1f6fOKBRq9vIcjjwdD4BTuPC-i54HcrliT1qowIN4eUrwi1ZwzLA3slyPvNxWayQSvuaI28Gr4s",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 75310635,
            first_name: "Евгений",
            last_name: "Кочетов",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/hHknJRGb7n1B7bBSeiNqMNs0msbZIclzRxBMFQj9t9P-kdzjDEfjIcgDLD7g_dFhLvDuCcxh.jpg?size=100x100&quality=96&crop=479,0,1361,1361&ava=1",
            track_code:
              "dacde9d8uztP_DnLhNPsp27ywyz5fcERkDb7WpP-t8dTmkHWk0jaWCzFOZiO1O_1AlsdhcAdzAaLU5U",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 78746037,
            first_name: "Лена",
            last_name: "Бобина",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/5LBHJAEX0JGH8iZtF4tqXTMfPYeGaynAUfZe0aIOp7acZACsayUfDrWyiO5x1KSdGND_KUEW.jpg?size=100x100&quality=96&crop=453,0,1704,1704&ava=1",
            track_code:
              "040861640Y-bGBsLZ1ktcCNXzTGEyuN0O8FqSwe5HEzrIbf3KaWw7K0mGAZlXnl4cPwTmL2q7mMgpAQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 79743250,
            first_name: "Юрий",
            last_name: "Березнёв",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig2/Edu0HMtHZAkRyXI7kelZ2I7MqYyk7b3OSYx_UgvoCrJ0CsKBkPeD4JtdEdLJ4cWd7qawIvEGzLA1thdEYZlA_-Ym.jpg?size=100x100&quality=96&crop=94,194,1296,1296&ava=1",
            track_code:
              "a93e487dcs365adqaaohjezTJHiCMpn55TXHQoAnFiN1B1WLbtkTrsrb9mptryLZuH_60btSlO7-UKk",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 87201252,
            first_name: "Дмитрий",
            last_name: "Тарасов",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/83z3wThBxY953BwWZEwqa2GCJdGhuZV7hxM1lSVBnfzknRawiZjJY1JXtTl_x2GYpacx9xbUs2UDG82tp7zINO7G.jpg?size=100x100&quality=96&crop=207,347,469,469&ava=1",
            track_code:
              "4c75998fw9IqNOnXI8jVeAcmvG3UDjvFcgiOeJwcCoVlFgFxJMaisR0K44Mnytd7UIhixO1uNtJpbeA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 87563910,
            first_name: "Николай",
            last_name: "Николай",
            photo_100:
              "https://sun9-54.userapi.com/c11173/u87563910/d_bd6aec66.jpg",
            track_code:
              "88a0391c6Dxmv-cNKyl_1dIsBasM2t6d02QbjkB6bGQOSYrSNguJXwPV5g8veXvbgIDbAjW604rIAXU",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 100700318,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "790a7f6bClX44l-_5-6CxXcSmH12MBbUEYoCv5lD44v9RRJ3R0xrNpmKC7q0u4fDIL94v0NDAs0dnWzb",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 104379003,
            first_name: "Эвелина",
            last_name: "Айриян",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/ig2/-U-BcbVuyPsqmh5RDwOTwYINDl03LudXos6G6PHM5ZHoQbFMGYB9vepqkKSy271e7mNRdMR_78ihIrUkUbEoLxfW.jpg?size=100x100&quality=95&crop=399,788,1157,1157&ava=1",
            track_code:
              "01c13432o15EuQf3onMwwdY1xvJ-mAmYLj73XIEO24mBBanZRInCPXSDU_HyIWLKg5ktMEvrHYEiKZk4",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 123033680,
            first_name: "Константин",
            last_name: "Батюшев",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if2/jB464WfRdTrLtC7YGZFghE5CO2GJLdORfjuAt1i8T74EG1EwZsdW-zmoQBDxzHtRoLwpEKgzZEMR6uFr5ctT1e3q.jpg?size=100x100&quality=96&crop=206,128,474,474&ava=1",
            track_code:
              "a16eb854Ypc_jlIUr9uNBrw5t7HROUGZu9UJkwo3m6yEy4TtNbgD9AbjWxKu04pX7J1fc-RKVYC3wmf3",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 134335756,
            first_name: "Виктория",
            last_name: "Аверкиева",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig1/NhVTCYHdsyhfTnzA4rheXaV7aHP_y4yY_nY29hEyley6_-Iq3YtPowgFSNUVukW5LWMKmyNU.jpg?size=100x100&quality=96&crop=303,719,680,680&ava=1",
            track_code:
              "ad021e5cct-uSU3LlAhMV0je1nIPN-YlWKjJ06gZ3-bX6H5MZRkTvMpyTs-SAxoBGHc4sDpE8jxUv6e3",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 135864316,
            first_name: "Павел",
            last_name: "Кондаков",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/qxBVkUvJB4EaZtLuYKt5QO5pkNSImUkhMspyIQkxt4wA1B9ZBxjo0FnmIfG_rrDA-awC1B7DaDCFqqBeA_cl2g6C.jpg?size=100x100&quality=96&crop=50,50,400,400&ava=1",
            track_code:
              "f281d5f9DAxdAy5qug6BjoHPPzTXzuG6A4iNDshYBidKtMY1RxRtbz5veW69VYHc2mLR9uK99aMPn-Nq",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 138818531,
            first_name: "Евгений",
            last_name: "Шереверов",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if2/8jNhMZPg7VE35-RsbE_ml-F3OM61OhKP8rdQ2WEaPliUa5wBUf77HUnwMPViYyuW5IgmoLcVzt2X0i27pqkVe7PT.jpg?size=100x100&quality=96&crop=121,121,972,972&ava=1",
            track_code:
              "dfe998c9iTb_1yw58VMqlEb3ou74-MGg2aDI1VuawMtCp0NsAg_oVZy9fDj6UnnJGlhLLM2L1bnVt6ax",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 140183823,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "55b592d6kz_QuoJAt5Mp-BkSceoZ8aU8XWEFP0Rj8D8cbo5TkoHyXLKF1U3llifzS7yaKCyCsSVRdmtb",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 141858495,
            first_name: "Анастасия",
            last_name: "Васильева",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/RFbr1nGQLCVsQpQT8sy9V2zSFrV6sNqKAfULUHKt7pRrWJbR66fUeCvssfXFk01GN6T5u9ui.jpg?size=100x100&quality=96&crop=385,87,1433,1433&ava=1",
            track_code:
              "4318a58bT8pYAFrpFXx_ESxUNnoJAXBuIRUusLIjdZi7Db6DJlsuqT5tXbtBJ3oQc_HbuDxyZHctAkDU",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 147862855,
            first_name: "Дмитрий",
            last_name: "Кантеев",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/RvOuSpflokEZ0IKPu7VFPExs-GhUX61ujcBL71RnnCn3qopWDWzr4FEeZbnEYPRENG3X5PmtRwWBDGFMr7NRxnR1.jpg?size=100x100&quality=95&crop=276,246,959,959&ava=1",
            lists: [29],
            track_code:
              "e052ba68AMzUXaQC_oZmAqryiM8I0aZZD4slaJyyPv0dabWkowh2q9g2pVqh3Tkyz19kPGj-8hNT201hjp858Rwd6g",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 150866667,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "154812deAlbkrkLdEe-YXQSPDXGUZxd6pvlGbx8FUJ1BFLPjB31jNdyXR9FD45pbXyXis6EUA2Oq7igL",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 152421039,
            first_name: "Алексей",
            last_name: "Владимирович",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if2/TEk2wItXPk0yn2qx0tnLmxLNrTUV6DiXAQ5WUrP3v5av5RFdhp56R3YR4geK2WBeGBGznN3__zw3Fgm9MCekxWo6.jpg?size=100x100&quality=96&crop=127,156,468,468&ava=1",
            track_code:
              "3e0bc25f2nDg92QrkyFh_wxgCtbP82_TZZN9Gqwf_0--0sZapnK7E4KbYS_AITGrUs_rFPqAe8pphBN-",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 153735153,
            first_name: "Татьяна",
            last_name: "Пятыхина",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/QAOZeauRLzfvPfG7fcOXrOZubaePzupAoDKGc9soVNIwxoKMxlVEXVBpPVgEtfhL4ja_IadI.jpg?size=100x100&quality=96&crop=0,42,960,960&ava=1",
            track_code:
              "84c9e43dyieTA-bU-sNQFv13Y9GbmjiIMaCE4xKpU8A0MLGHTy6rRKFu4df8lwERo96IE67pLJE9t-qH",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 159527745,
            first_name: "Наталия",
            last_name: "Петкевич",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/ig2/x3R1uVcFkZNBvBdpxfybjzkOfZgP9JOJkw8QDUeN1AjC6aSOmw3xHj-mcwocp-K4B8JicY77ewkEN9s6HEnME18j.jpg?size=100x100&quality=96&crop=1,517,1618,1618&ava=1",
            track_code:
              "7db7a6d0X1_FEBRJSRpMdKJ5s4jUF4WLDEVe-aet7zfObHuvwl0-PPIhEExFFklz5dFeSuFkkZIAUjCd",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 162379386,
            first_name: "Лилия",
            last_name: "Пташкина",
            photo_100: "https://vk.com/images/camera_100.png",
            track_code:
              "201571d5RvjI7_UxW3CWT9iAszxrJyrYMvCDK1vnnESIEO-dcEYnm_6H_TNYJ5QVmiRd_l5UPsE-5-1P",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 164508880,
            first_name: "Анна",
            last_name: "Мелюкова",
            photo_100:
              "https://sun9-74.userapi.com/c10591/u164508880/d_c1c8778f.jpg",
            track_code:
              "f2891dd7nwapRmDurFTEENcRFUX_Gqy8mIIQDPgMmMH3Ta_UMHD-ZZt4ZOqqWJdJnbX9h8ppuKWUlX5o",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 170855915,
            first_name: "Pavel",
            last_name: "Migunov",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/r8r2sw29gRhtoW6FrmoqWlndR6NYKZHy7E5T2SdYreMlQqPBU-OWmxGGIP1r6YEqOpEmH-rM.jpg?size=100x100&quality=96&crop=293,0,1918,1918&ava=1",
            track_code:
              "8d9c71d4oCUsZNSgbb5f7nE9nuQ13iYfjTUbBKzfvebitHQwi7LBRhRYhqJtvl3rO5BzJgCtMgaBInVg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 176649437,
            first_name: "Дмитрий",
            last_name: "Захаров",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/MYpsYm_RgOry1Kiz_KxCjJBIvG7X1uCruxYwkwT_KssYjJh4FmJo5QsZfeT4W7-EspEoJwV4.jpg?size=100x100&quality=96&crop=416,0,983,983&ava=1",
            track_code:
              "96f5ab099Hd97n6za4Ov2EJMECZPE97x19zt3kKKuH_xMgyyZ-eVFBvUfeFsga-HAuP_5Hpgyujby4O6",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 180780228,
            first_name: "Александр",
            last_name: "Коцарев",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if1/mJ6xkbtOHeZQVLgRuvRDC9eLoIIajhlesES-J8HscMQm-N8LL_3RPfVZfic4xAacYAW6RHyp.jpg?size=100x100&quality=96&crop=25,79,239,239&ava=1",
            track_code:
              "78156a3cSaZ-ZrMqYyD6OtI0xOR5j0-qwgBEqzaXuF8CJ7RQDWooxRpb5CpgL_o8lZokJkz8W7POFyrP",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 183830492,
            first_name: "Андр",
            last_name: "Джаканов",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/KYkypANUtAS94_YTm3hvQiQfS4Q5CXtbZTN5mndStcp5zChc4p4HwEBF-Tw2Bg7lzaFVyQ.jpg?size=100x100&quality=96&crop=7,190,1600,1600&ava=1",
            track_code:
              "cf9d1cc7y4zAqBVCUl1Kd9LEvRWasxX2W7PrazO_Uem2hb-ONoaq7_TARUtUBhwhkGFX16_AAe9XpIUP",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 188136761,
            first_name: "Сергей",
            last_name: "Козлов",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/jJOBg1LyLB9JMpXA0axLCJJmDpOfIvs4VivMj8ODrysaC_duWJ-UN5C5FMV-gUyay6u6km53niYIG0zlWXJizCBp.jpg?size=100x100&quality=96&crop=486,445,631,631&ava=1",
            track_code:
              "24ffaa5dOdqyppbxBuydQTiSUAOZBIzO77n9lGKxm9L2d4u6hnhYudeWxf5YvJxPeDi5wax3mNfjrpPw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 194563078,
            first_name: "Евгений",
            last_name: "Ларков",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/Qm1X64088usvt2A419NDn_rqzEpTHJQ_d_H2UJBiEG4ttqaO5QcyvYAyQq0YmG5kwgnhJ_ljjAdVNXPSau7YfqWe.jpg?size=100x100&quality=96&crop=0,300,1620,1620&ava=1",
            track_code:
              "66316f90czVDLLdt0ICQFPOnwaT-aGDu5AgE80HpV2pbpGdNGAESVidH4DbRh8UUuwwhZssbdPfoH2qX",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 198187837,
            first_name: "Павел",
            last_name: "Кулик",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/1WOj_dn3L_q8oMai3hvYWd60t6TOVfqEW8CdHCMMSkdung03ZLfArTYNLwguDW9UbSpXx7BKVCTrzSSdjeMDXHEr.jpg?size=100x100&quality=95&crop=0,0,1920,1920&ava=1",
            track_code:
              "97cd0770ZWV4mzdC6VYJsWTrswXFGTqLBaJAHpkFjTYdSr2De0EEBhmlYk_jUVKyJURcx_BqLpIJtS56",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 199706102,
            first_name: "Сергей",
            last_name: "Глушаков",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/JkRHNSk2gS4KfyYsRWM1kBelCKOxBg7Qjwefo9zVqjcVrXEl80CSmVZBSJVCn3fQg2gl5YM9.jpg?size=100x100&quality=96&crop=158,594,974,974&ava=1",
            track_code:
              "a3fc3ebc1cgDSfjauq7H9g6jIOWRV_fx_MVVrtlMlaz_nZ2UfhG0qzp2q9rg-MH4RQ_KJ6Qk4-jw0jvK",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 213479197,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "43edbb41WG99Z_XWTOdQ6I0TRTpSht0mw4Axt9h3v5m9jsGAGW45DEoI8t5N5gS3x7aq-Gf1yT_Pl1_T",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 215038853,
            first_name: "Евгений",
            last_name: "Кочешков",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/ig1/zZcyrbfGUy21t-liSyXDWUK0JZtbBureamW_y-iPGuskqZmrBo2u6hVYzigIeq8Hc8YXkjLG.jpg?size=100x100&quality=96&crop=58,14,588,588&ava=1",
            track_code:
              "df3b5688GLo7uLZYUdnFgfW8wTcowZ2HKrrLxENYXEHyjffKG0552V-FvQ1W2JeLsRUq9R2yiZ4mraWg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 224269077,
            first_name: "Максим",
            last_name: "Шаталов",
            photo_100:
              "https://sun2-10.userapi.com/c1502/v1502077/9/ItjpyxTML1s.jpg",
            track_code:
              "682fd361jnsQ6fmIu8qW2jVw8F4Uo2-R06JvokXgS4BSQ0HdzVbvGHHQ84m5mpXbeNsfnCHQe4jftQHG",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 228927835,
            first_name: "Анна",
            last_name: "Цуканова",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/kV5cc_MSIolprt23YUQBRl1SnrkozXrpN1VRt2yKT2qah2HMx5u65x9PcEGPRZHFgxvqgt9psxYZBePPL68tNxIC.jpg?size=100x100&quality=95&crop=733,0,1140,1140&ava=1",
            track_code:
              "b05ee717MJveZVXhFtnAzTA25E5j2-MJjhUS2QJ6DIhEtJsq9B9R-OsPVeMb0JTNdpkJjFao9xCCAny9",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 233577109,
            first_name: "Анна",
            last_name: "Аракелова",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if2/oqk-JzSa_Xue6T4CdSeok8DO9D8MC3aR7BLOCRoxn-9AdvJC4cZBgee4kKGBqelcRoTdHunX-oYQFZzNdFbodNpA.jpg?size=100x100&quality=96&crop=20,40,200,200&ava=1",
            track_code:
              "20daca6bhCW6TS58njSALp-PIgL_jYE_9RzVJpYlx2IIhrt4Iy3lRo0mLn6VZdIg0SPDwMr-lSb5C7tC",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 235138373,
            first_name: "Тимур",
            last_name: "Абдураимов",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/m_2yVS2hLwrYVNFl66JhtH2yJPtGwYOaQ09Qqo1telv7bEHhtSw49zEN6qx-X2fYpohix3lG.jpg?size=100x100&quality=96&crop=187,81,247,247&ava=1",
            track_code:
              "ce75a6ae0Ya4cVXGsrbDj4YKnk4wPjv8jZBYVSfxmN6cty01W0a87eoTacW1speMPjg1pfILSOiUnE87Qw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 238652896,
            first_name: "Руслан",
            last_name: "Аитов",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/ig2/WBwLPgIcZCVhs5qBSbfMU9B3vfy1RbkTl2c07CTHp8Ew2MljKJUOuvHRTpRlrpX4IGVoPHfGhRC4KY60ZkHx3OGI.jpg?size=100x100&quality=96&crop=17,0,675,675&ava=1",
            track_code:
              "9a6689c6Ewqfy7cwRALgmiqx7XaY-B_EEV3Ju9fSj4yu0LC6LZ9-YcKv2GFOA7OemYhImFrNbNAIUd7Vsw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 242325316,
            first_name: "Каринэ",
            last_name: "Гюлумян",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/JphGKymVirALmiC5JdqT4sKHjGDCA2vg95soUVF9yKTFBCQEpr7B9P6sgv-KC70gS7YdvHw1.jpg?size=100x100&quality=96&crop=44,74,318,318&ava=1",
            track_code:
              "aeda1508zRGkwtomv55IQKuo4KxHivsdo_ozCkBmryhoofNMFWygevn04na8zR9HHJpNQoW_iAm69iRkJA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 247763176,
            first_name: "Александр",
            last_name: "Юрковский",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/B0XR5cucz1_PRF3I_I8y9z3p0KYpHNmHAiStfjGfA81FxGv5Hm4AybUrJaDx_klfpwHnV8JH.jpg?size=100x100&quality=96&crop=76,115,463,463&ava=1",
            track_code:
              "430b9b1f95heoGWvlRLq1utFQlC2Ilw2DzVh2J1YgtnfsA7Xp9Ka8waQCqSXE-vXW3XpvnQXLyIWOXa2-Q",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 253443988,
            first_name: "Роза",
            last_name: "Аракелова",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if2/6urgCyni8YFgeWvHHal5LqMPoNky-83j_TAsoJRsu4MFVrMZkcyU8SmBrwI8_ucIFifhKdMfnIxmJV-o6P8zZ-yl.jpg?size=100x100&quality=96&crop=262,326,1531,1531&ava=1",
            track_code:
              "89eb3352zI3z6WaQps0rbHMihY6caBL7RE0wHDAjppim5m8mAEGh5qjZCparyytuxBohbl5dYe9dQSdyVA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 253858617,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "be050112ryE3Ai_0sU_QZIRFnrhzGgi8y0CnjAbjPrSccKpLzqXCSm4wH_KxGd5gOXIzV7Eve6jSTLDiYg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 254851145,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "ddccb471ZrUKpqRhSIJDbtnJnmB9SgxSv4ULAEqxS_TJhDrSSYQL3lnHnDZL1R9vbvk2jb9_f0amiRxuLg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 256628436,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "084b0161Wr3S3bfqtyeqZVf9eFfpkZ7JQ1k5L6DKrfo0D6dz9tU31t_sirzjKfhm6MjXuSuk7d1aVS5BxA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 258183174,
            first_name: "Сергей",
            last_name: "Кацер",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/IQZHDNicJ-eCZuMqfCfGNfI1VnIGVKTce2Xfw9ma713LUFQg5Gg4ItXTwYTkKGFayAgsBQVonXSsw2lbNZQ3qiGM.jpg?size=100x100&quality=96&crop=6,0,2129,2129&ava=1",
            track_code:
              "c1d3fb785cXkYrkYtmDjYk2yzq90_ZJLQ8ZqQtYgNUBXLEC-LSWIrr5UiBzlPbRs9oJlQ7bI4V9ayn0ssg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 258787535,
            first_name: "Илья",
            last_name: "Швырялкин",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/P4rxDDqpN2KIuhuT25ANQXU751gCf4xlT8vmBeYPOOHCEQLh-IDPR2s5AuI-mOWmVlU0qvWc.jpg?size=100x100&quality=96&crop=144,144,576,576&ava=1",
            track_code:
              "b8497f01IAdtHNZj5qJycknSJoNBhha1yy7Y9GOfYxIxgEoe8atNbDco6WTqqyAp9-aJboOzZaHSIs-aBw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 259338387,
            first_name: "Рина",
            last_name: "Голда",
            photo_100: "https://vk.com/images/camera_100.png",
            track_code:
              "45122d9147I85h48A1hHhf4qnQu8BOE5CjajIllT9IAkB_v-xz6O2TKAIz0CBRaCTBg55H4xki0TOrRMPQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 259680596,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "91c4f22725rfPqK7Swfn9FX8h_01218nDmszg8d0qUgXQN21X5i28dINnLEYDbCq7sgiE_fuLDMXZyTtow",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 268045389,
            first_name: "Вадим",
            last_name: "Новаш",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if2/v--0j_WjIcdvz9yjhJZKR5MZJX8F9oqZ7zzKM4tqh6OuLU7PILFb-bDywbdMitZf5GIte9gbaW_TgciToL-v-l4V.jpg?size=100x100&quality=96&crop=0,0,200,200&ava=1",
            track_code:
              "6a65efa04cfHwWbVSxRaSoXJ2C2-fWMdD1aeZL9tOXTO2HsSHSKMrM30DNRFHV1JPPt8zHxIEAkWWokK2w",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 276228863,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "53121a10mtQLVNnuYBk1WtqTxXxkRTke77m8FqWoz24cz8wp6hj3v1Iw4ORmHWIMb6pvl6ZwSgr2tat4wQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 280128249,
            deactivated: "deleted",
            first_name: "Дмитрий",
            last_name: "Есин",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "d10bb5cdzEO_mj1vuVp4mnsLIboAfvdUFuFL_xEoANzcPpYuofyhKOCrAWmxWnGZzTiJW8JLhEAP7VyRdQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 294245982,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "aeb9dab5T4pBnWOt5lw4aFHjiWVcLyN3eXSrkCKZqeAj5Bqz4Woi4R2rW_vnUW4_69stj54aUGNgeLz-Rg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 294464963,
            first_name: "Михаил",
            last_name: "Уткин",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/ig2/vhNfPVRZlDLZW6FoO6A4UW6QRziAru8rujOJSCODlnSho8pGppPU0PJVCAKSgiHB9a_xdjcDo6o1peP13JyGCaAb.jpg?size=100x100&quality=96&crop=464,12,1889,1889&ava=1",
            track_code:
              "329201404cdLQglrDfOrTnEN-lRnvqk_ibArwNxomZHyibOC1fOMrEN0Nj8NpvxK1TVQv6WL2iuQvDyuuA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 297238997,
            first_name: "Юрий",
            last_name: "Кучма",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/TpTOAtIqG3MUldSUbV26pZKYBt4GOKcc8ja8SLseF3P8BM6yHG7SF4nBnRgyDMvErk_54mPu.jpg?size=100x100&quality=96&crop=163,2,459,459&ava=1",
            track_code:
              "986bbb1b9WqSeaKHs0y9PfnXTrbIZZWQog8n_3dRn3N_InhgeCOYAcFBmoDvGus9UO_rWQpQ5oS7AzCREw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 308744684,
            first_name: "Сергей",
            last_name: "Корн",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/qFs8Ehwr7C9Go9FP882_ctGw_3aSRBJ9QoHdxAaYEg30JgLy0AiokeOsDI4LmyzTZcoatpTD.jpg?size=100x100&quality=96&crop=80,180,1770,1770&ava=1",
            track_code:
              "7428c42d6Ybolq8h97NhfsZXkam9KS4dDO453B2HL2vzT3ltng2E7eb3l3ChvjJ9YGA1RX8cXQkV4i6yeQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 319192726,
            first_name: "Иван",
            last_name: "Корепанов",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/7Lyc-DIdQfnVCL_U3O2PTxv22jnryf4KFmWZXeAwOCxgYDW4CmDT1Rw4Rh0hqBXGARya-CwR.jpg?size=100x100&quality=96&crop=0,226,1634,1634&ava=1",
            track_code:
              "4e14392bEnse5X0a3iPUItt_VpB4y9Su_Vs9pWD6bdVmKKHyvTl_EBTREB-MfNcsekn4frr-p7rkVyrLBA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 322500520,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "a8b9d9a2ydBfO6B8HvxXe6h_tzJr5xcRCWqAqnGMxOaNoQJ6HR6kuwQDnHge-QcvDEsZ2qnSZAUQZpfEFQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 329435265,
            first_name: "Владимир",
            last_name: "Вахрушев",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/if1/tys1zLrdsjnCPOODG0ty-lwAFAhkqvPaorwo_C41YesEtS9a9VD7qcv1OeFMtOEldxW2-qqk.jpg?size=100x100&quality=96&crop=0,90,583,583&ava=1",
            track_code:
              "40518598J5-5Hwc6b23dqXAV1u7hp0hmE-ttOeRRw5jCgVk3zuBK9OYqOjg5Mtz_0CZ8AyOSO3IK53pXgA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 331407581,
            first_name: "Дмитрий",
            last_name: "Колесников",
            photo_100:
              "https://sun2-9.userapi.com/s/v1/if1/cNEbVOaKKhlL3Bu0VihAENUcfGgtlzvIVN6emDI7SfHHkkDgMiPVbJyJUJ7M7r_U0zAovHCb.jpg?size=100x100&quality=96&crop=0,30,234,234&ava=1",
            track_code:
              "cf226763YiXBDKOwEP3HmOr4TDc0S9W1-RA-x0bj42lEnhDm0aIPTp00mrIbrcPOS8zo3vZ-pqHgHCmpIg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 338057864,
            first_name: "Арсений",
            last_name: "Березин",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/ig2/AhGNHtiyDyRcTUUazMRDb0leXJUcapk-y6ZTPj9H7kPTqyyH-TJPj4N6n32NrpFG_lck_Ms1RSlgRCSaa8JTlNfA.jpg?size=100x100&quality=95&crop=680,112,683,683&ava=1",
            track_code:
              "d60ed8f1Sux53VSkS1Sk0FJ-SvpHpD_mIgHDWoUSJeqnuAcIDtEnh3Dta_FND_HT8kfgFoWRTPI7DdQ04Q",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 341946880,
            first_name: "Alexander",
            last_name: "Nesvit",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/ig1/qDS83WiGbKIpuzfgs_-ala42FP9LcMpjVua2sN0dNx3jWYmc5Z3OD5pfPqhDE0aomAYPeO9v.jpg?size=100x100&quality=96&crop=3,394,600,600&ava=1",
            track_code:
              "bdbb86ed4mdJ-2dgrH60iXLlIRLnNgagGxTPYkTC8q5pK3a7olSPDBbKXjb-drjc3NyF-iUDdbQCGNgMIA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 350497189,
            first_name: "Аспандияр",
            last_name: "Касен",
            photo_100: "https://vk.com/images/camera_100.png",
            track_code:
              "a458a2ff0RribLqspRcdE6EAgl6ebI-ybm8AcQTJvUNz_9B0NkK8cbBai6nxRUgdDzAmv1xZ_KZ3YxcfYA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 350878891,
            first_name: "Rinat",
            last_name: "Farkheev",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/ig2/Gnop5XpVkBTPoKN68mUhilTQBmBMS-SWWi63w8oZkJNBNvqld_7akYBbhdLME2iSXnjfbdT1prlO_9-79ukBVfl2.jpg?size=100x100&quality=96&crop=403,374,1546,1546&ava=1",
            track_code:
              "77483f04Rz4cVUQAX0JgzJY0f5AiN7RfYZXoPmEJYDwUThUko-YqVRFsKwNYE2zDNA3aeeACx0t4mf9QBQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 364601169,
            first_name: "Pavel",
            last_name: "Webuilder",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/kCPwl3prUnSIVnIBM7LWHg96OuNPLk5nWKsoQRLQ_2gKjyBflyJRnbuAGsgrdJHSC0dRf0cE.jpg?size=100x100&quality=96&crop=3,2,221,221&ava=1",
            track_code:
              "bdc9b6b3wstNZPH8U6IG2pHxjDYh7i7kP2ikeXW-n7o_x1l99NqvoB9dyKtcpwnbO8Em1-PbXfAmZLMXEQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 378506555,
            first_name: "Александр",
            last_name: "Иващенко",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/nV6qRlCvx66C9wWcD5cS5PeA6eLnrz5_9kq6BSkkhBvM3IPnPfGMwfNWwNE7d5Y-uJZhqWOyxQx6QVeQGpmYdAI_.jpg?size=100x100&quality=96&crop=118,92,833,833&ava=1",
            track_code:
              "c0e2ed99PcLyrmG9-wkMkUgbEgPJ0NEQdZy33hvpDoDCD4hbstNQqaufCr6tUwjE4i-77gvlogRskKCwfw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 391548754,
            first_name: "Michael",
            last_name: "Smith",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/nIxRyuGYbKO1QUv3vP_r-svej9vD-6NXGtm8KVwTe1ogXMm50p8db4PpNKIqgPpy1wYkk1Po.jpg?size=100x100&quality=96&crop=938,169,1410,1410&ava=1",
            track_code:
              "88ae2ad0VpvQkzGTQTk3wTHhBcCLsb3XAcxYObOpgTE1W0AuaUI78IP2CsZIOjbGlNesLEmEzsMYwE9X1w",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 406597533,
            first_name: "Artem",
            last_name: "Lavrinovich",
            photo_100:
              "https://sun2-11.userapi.com/s/v1/ig2/81Etz8xLoPmb_IeEWZ3Wb3kHGTGePR-XimPigfan-pan0YFJKWRxXxpg-Wd--2uUSpFyll5P4RpWBVc7CGC8f6Di.jpg?size=100x100&quality=95&crop=752,428,1092,1092&ava=1",
            track_code:
              "56873f3eIb-CsecvkT6lTuQ2XQRdEA4pPSUaL-ysABV4aVP2m6VM1I_QjCzAOPVETQLy758lfT0kKQ1BiA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 422184610,
            deactivated: "deleted",
            first_name: "DELETED",
            last_name: "",
            photo_100: "https://vk.com/images/deactivated_100.png",
            track_code:
              "149e58c0psLGxA6brQjX9dqvhzLJ1CXDQglfr3QqAhtToYhc3VLLqcvyMp37X9aucZgq2gvhVtdbBUjBEA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 422324602,
            first_name: "Артём",
            last_name: "Кудрявов",
            photo_100:
              "https://sun2-4.userapi.com/s/v1/if1/lpstPFlg1T8nShwZQUzvbK9wAjESM1wJ3fjpc_XoBySMPDaBHyyRbxRfy4ipGDCZckux9CsB.jpg?size=100x100&quality=96&crop=266,59,1399,1399&ava=1",
            track_code:
              "80d346f0dY3DoXQacZwIsURjtat_tXoCuh1PgQ3eWfqxWzfHnyUY5p-WShd0zVrn0FQZQb2ACRajEVjvaQ",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 423346279,
            first_name: "Александр",
            last_name: "Мецлер",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/JqztX7-RT8JBGOQ4DPF5X1Qf4K5PuywbzEX69RIu5Odt5gGQT5T8huuUKvqUk-Hrre39nYB2.jpg?size=100x100&quality=96&crop=72,92,528,528&ava=1",
            track_code:
              "ed333ed4zW4TTBvuazjInzhxV07jOZTJ7o8FUrUZWxMe5AoANu-gBUF-d75tacyTr0L8ryEM5933gxI80Q",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 431828997,
            first_name: "Дмитрий",
            last_name: "Неведомый",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/if1/vMUgS_MwnA7ADTU6h0R0r2atkZGviiiAIrCUNEbW4h48gLwL_EEf2kiUtRcyDCtjpDbhzbeS.jpg?size=100x100&quality=96&crop=51,101,414,414&ava=1",
            track_code:
              "cda14924tuOPsvF8OKhLxScq-F-T_RCczlMGqkCbnz0wDLDVT73biNGAyXo_-kDHvRJdsFHIY4jXXxHEJA",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 453537084,
            first_name: "Марио",
            last_name: "Магомедов",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/yHa5MNcYzYGbxawasLV-PseRzSljRWqtqH7eLor4Vj8pnCVmXWQJB442_1cXZ5ZME-OmEtwa.jpg?size=100x100&quality=96&crop=0,202,1218,1218&ava=1",
            track_code:
              "684c1ecbMUNgu0_gHYaHNH_n4-dojvMY-ZGR8yMIgxt7IgmJW7hcKD6Ld-AahNZi69ZHC6q7gAzgnYadRw",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 462043367,
            first_name: "Михаил",
            last_name: "Мищенко",
            photo_100:
              "https://sun2-12.userapi.com/s/v1/if1/Qw3nNgLcHIPiRmxHE7Vpk93gu8u7JS2voXjAASeQ1SCYgYPMAmnULH0EfW8JW4EQRLuTJzKk.jpg?size=100x100&quality=96&crop=0,0,999,999&ava=1",
            track_code:
              "5448c0f7-KAOZSnWpE_DYgyoG2C4E4PqXoxJsVoQvenkTFqS_euVywZXE9WkTZdgm5qxj3om8P5HgF7fPg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 476946962,
            first_name: "Вадим",
            last_name: "Векслер",
            photo_100:
              "https://sun2-3.userapi.com/s/v1/if1/atCBS3Ue-dXICNoxkyLBW8YxH4ew-PuXhmhYdh2b1kB7N7q8FmJte4LVhiPWBPgiYaRUmn0q.jpg?size=100x100&quality=96&crop=111,188,634,634&ava=1",
            track_code:
              "8a800d1cvUqK92jouaal8H8Df873_yWrxQpxPOoVrDo9GEalxvXQIdWRUunr9qn97DvVJDXKVr_cBmZSjg",
          },
          isSelected: false,
          element: {},
        },
        {
          data: {
            id: 544503873,
            first_name: "Галина",
            last_name: "Аракелова",
            photo_100:
              "https://sun2-10.userapi.com/s/v1/ig2/DlBpt_83kHr63c-Hx2pozogYsBTKQXGV_bWusacfIUjURf2l60O_4FmpS-oYEIAIlv9S_XhDRcOGtxyBuCE1A-J2.jpg?size=100x100&quality=96&crop=0,0,1620,1620&ava=1",
            track_code:
              "9a2d6ef7RORUE40RCkHQCkk_eqCqNPEzG-XX5UkIc72mA0U2nQQpjwomtEVbQNUL3AbRS2gBgicC6cCLLQ",
          },
          isSelected: false,
          element: {},
        },
      ];

      Model.login(appId, accessNumber)
        .then(() => Model.getFriends({ fields: friendFields }))
        .then((data) => View.renderFriends(data.items))
        .catch((evt) => {
          alert(
            "Ошибка: " + evt.message + ". Будут подставлены статичные данные"
          );
          View.renderFriends(dataStatic);
        });
    }
  },
};
