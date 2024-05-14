(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();function d(){document.querySelector("#task-input").classList.add("is-danger"),document.querySelector("#task-input").placeholder="ЗАДАЧА НЕ ВВЕДЕНА......",document.querySelector("#task-input").focus()}function u(){document.querySelector("#task-input").classList.remove("is-danger"),document.querySelector("#task-input").placeholder="Добавить задачу"}const r={headDate:document.querySelector(".date"),addTaskButton:document.querySelector("#add-task"),taskInput:document.querySelector("#task-input"),taskList:document.querySelector("#task-list")},n=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];function f(){let t=new Date;t=t.toString().split(" "),r.headDate.innerHTML=`<p class="heading">${t[2]} ${t[1]} ${t[3]}</p>`}function o(){let t=n.map((a,i)=>`
        <div class="box todo-item" id="item-${i}">
            <div class="input-control">
                <textarea class="textarea" readonly id="textarea-${i}">${a}</textarea>
            </div>
            <div class="edit-controlle">
                <i class="fas fa-check agree" data-index="${i}"></i>
                <i class="fas fa-edit edit" data-index="${i}"></i>
            </div>
        </div>`).join("");r.taskList.innerHTML=t}function m(){r.taskList.addEventListener("click",t=>{const a=t.target.dataset.index;t.target.classList.contains("edit")?p(a):t.target.classList.contains("agree")?S(a):t.target.classList.contains("save")?g(a):t.target.classList.contains("cancel")&&y()})}function p(t){const a=document.getElementById(`textarea-${t}`);a.removeAttribute("readonly"),a.focus();const i=document.getElementById(`item-${t}`);i.querySelector(".edit-controlle").innerHTML=`
        <i class="fas fa-save save" data-index="${t}"></i>
        <i class="fas fa-times cancel" data-index="${t}"></i>
    `}function g(t){const a=document.getElementById(`textarea-${t}`);n[t]=a.value,localStorage.setItem("tasks",JSON.stringify(n)),o()}function y(){o()}function k(){const t=r.taskInput.value.trim();if(!t){d();return}n.push(t),localStorage.setItem("tasks",JSON.stringify(n)),o(),r.taskInput.value="",u()}function S(t){n.splice(t,1),localStorage.setItem("tasks",JSON.stringify(n)),o()}r.addTaskButton.addEventListener("click",()=>k());window.onload=function(){f(),o(),m()};