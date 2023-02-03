// 경력 & 프로젝트 초기화 event
var initExprience = function (elem) {

    // 회사정보입력
    let experienceWrap = document.querySelector(".exprience-wrap");
    for (let i = 0; i < exprienceDatas.length; i++) {
        companyElemHtml = document.getElementById("company-elem").innerHTML;
        companyElemHtml = companyElemHtml.replaceAll(/{{COMPANY_DATE}}/gi, exprienceDatas[i].date);
        companyElemHtml = companyElemHtml.replaceAll(/{{COMPANY_NAME}}/gi, exprienceDatas[i].name);
        companyElemHtml = companyElemHtml.replaceAll(/{{COMPANY_DETAIL}}/gi, exprienceDatas[i].detail);
        companyElemHtml = companyElemHtml.replaceAll(/{{SKILL_TOOL}}/gi, exprienceDatas[i].skills);
        companyElemHtml = companyElemHtml.replaceAll(/{{COMPANY_DESCRIPT}}/gi, exprienceDatas[i].description);
        companyElemHtml = companyElemHtml.replaceAll(/{{COMPANY_ID}}/gi, exprienceDatas[i].id);
        companyElemHtml = companyElemHtml.replaceAll(/{{ID}}/gi, exprienceDatas[i].id);

        experienceWrap.innerHTML += companyElemHtml;

        // 프로젝트리스트 추가
        let panelWrap = document.querySelector(".panel-" + exprienceDatas[i].id);
        let projectDatas = exprienceDatas[i].project_list;
        for (let j = 0; j < projectDatas.length; j++) {
            panelElemHtml = document.getElementById("panel-elem").innerHTML;
            panelElemHtml = panelElemHtml.replaceAll(/{{NAME}}/gi, projectDatas[j].name);
            panelElemHtml = panelElemHtml.replaceAll(/{{LINK}}/gi, projectDatas[j].url);
            panelElemHtml = panelElemHtml.replaceAll(/{{IS_VIEW}}/gi, projectDatas[j].url == '' ? 'hidden' : '');
            panelElemHtml = panelElemHtml.replaceAll(/{{ADMIN_LINK}}/gi, projectDatas[j].admin_url);
            panelElemHtml = panelElemHtml.replaceAll(/{{IS_ADMIN_VIEW}}/gi, projectDatas[j].admin_url == '' ? 'hidden' : '');
            panelElemHtml = panelElemHtml.replaceAll(/{{DESCRIBED}}/gi, projectDatas[j].described);
            panelElemHtml = panelElemHtml.replaceAll(/{{DETAIL}}/gi, projectDatas[j].detail);
            panelElemHtml = panelElemHtml.replaceAll(/{{USE_SKILL}}/gi, projectDatas[j].use_skill);

            panelWrap.innerHTML += panelElemHtml;
        }
    }



    // 아코디언 추가
    let accElems = document.querySelectorAll(".accordion");
    for (let i = 0; i < accElems.length; i++) {
        accElems[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}

let navItems = document.querySelectorAll(".nav-item");
function moveEvent(elem, up = false) {
    let target = elem.dataset.target;

    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }

    elem.classList.add("active");
    if (up) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' })
    }
}

let mainLoc = document.getElementById('main').offsetTop;
let introLoc = document.querySelector('.pf-intro').offsetTop;
let aboutLoc = document.getElementById('about').offsetTop;
let expproLoc = document.getElementById('exp_pro').offsetTop;
let headerHeight = document.querySelector('header').offsetHeight;
let bambar = document.querySelectorAll('.btn-bar');
window.addEventListener('scroll', () => {
    let nowLoc = window.scrollY;

    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }

    if (nowLoc >= mainLoc && nowLoc < aboutLoc) {
        document.querySelector('.main-item').classList.add('active');
    } else if (nowLoc >= aboutLoc && nowLoc < expproLoc) {
        document.querySelector('.about-item').classList.add('active');
    } else if (nowLoc >= expproLoc) {
        document.querySelector('.exp-item').classList.add('active');
    }

    // 헤더 nav-item 색 변경
    if (nowLoc >= (introLoc - headerHeight)) {
        document.querySelector('header').style.color = '#212529';
        document.querySelector('header').style.transition = '0.4s';
        for (let i = 0; i < navItems.length; i++) {
            navItems[i].style.setProperty('--background', '#212529');
        }
        for (let a = 0; a < bambar.length; a++) {
            bambar[a].style.backgroundColor = '#212529';
        }
    } else {
        document.querySelector('header').style.color = '#fff'
        document.querySelector('header').style.transition = '0.4s';
        for (let i = 0; i < navItems.length; i++) {
            navItems[i].style.setProperty('--background', '#fff');
        }
        for (let a = 0; a < bambar.length; a++) {
            bambar[a].style.backgroundColor = '#fff';
        }
    }

    let windowScrollTop = $(window).scrollTop();
    let height = $(document).height() - $(window).height();
    let percent = Math.floor(windowScrollTop / height * 100);

    document.querySelector(".bar").style.width = percent + "%";

});

// 처음 페이지 로딩 시 경력사항 초기화
initExprience("init");

// 아코디언
$("#accordion").accordion();

const menu = document.querySelector(".wrap-bar");
let count = 0;

menu.addEventListener("click", () => {
    menu.classList.toggle("active");
    count++;
    if ((count & 2) === 0) {
        menu.classList.add('deactive');
    }
});

AOS.init();