import { db } from "./firebase-config.js";
import { ref, get, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const listBody = document.getElementById("admin-reservation-list");

async function loadAllReservations() {
    try {
        const snapshot = await get(ref(db, "reservations"));
        const data = snapshot.val();

        listBody.innerHTML = ""; 

        if (!data) {
            listBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-6 py-12 text-center text-gray-500 text-base">
            현재 등록된 예약 내역이 없습니다.
          </td>
        </tr>
      `;
            return;
        }

        let hasReservations = false;

        for (const lotName in data) {
            const reservations = data[lotName];
            for (const resId in reservations) {
                hasReservations = true;
                const r = reservations[resId];

                const tr = document.createElement("tr");
                tr.className = "bg-white border-b hover:bg-gray-50 transition-colors";

                tr.innerHTML = `
          <td class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
             ${lotName}
          </td>
          <td class="px-6 py-4">
            ${r.name}
          </td>
          <td class="px-6 py-4 text-xs text-gray-500">
            ${r.userEmail || "-"}
          </td>
          <td class="px-6 py-4">
            ${r.date}
          </td>
          <td class="px-6 py-4">
            ${r.time}
          </td>
          <td class="px-6 py-4 text-center">
            <button 
              data-lot="${lotName}" 
              data-id="${resId}" 
              class="delete-btn px-4 py-2 bg-red-50 text-red-600 rounded-md text-xs font-bold hover:bg-red-600 hover:text-white transition-colors duration-200">
              취소 (삭제)
            </button>
          </td>
        `;
                listBody.appendChild(tr);
            }
        }

        if (!hasReservations) {
            listBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-6 py-12 text-center text-gray-500 text-base">
            현재 등록된 예약 내역이 없습니다.
          </td>
        </tr>
      `;
        }

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDelete);
        });

    } catch (err) {
        console.error("예약 목록 로드 오류:", err);
        listBody.innerHTML = `
      <tr>
        <td colspan="5" class="px-6 py-12 text-center text-red-500">
           데이터를 불러오는 중 오류가 발생했습니다.<br>
          <span class="text-sm text-gray-500">${err.message}</span>
        </td>
      </tr>
    `;
    }
}

async function handleDelete(e) {
    const lotName = e.target.getAttribute('data-lot');
    const resId = e.target.getAttribute('data-id');

    const confirmDelete = confirm(`[${lotName}] 주차장의 해당 예약을 정말 삭제하시겠습니까?\n한 번 삭제하면 복구할 수 없습니다.`);
    if (!confirmDelete) return;

    try {

        e.target.disabled = true;
        e.target.innerText = "삭제 중...";
        e.target.classList.replace("bg-red-50", "bg-gray-200");
        e.target.classList.replace("text-red-600", "text-gray-500");

        const reservationRef = ref(db, `reservations/${lotName}/${resId}`);
        await remove(reservationRef);

        alert("예약 내역이 성공적으로 삭제되었습니다.");

        loadAllReservations();
    } catch (err) {
        console.error("삭제 중 오류 발생:", err);
        alert("삭제에 실패했습니다: " + err.message);

        e.target.disabled = false;
        e.target.innerText = "취소 (삭제)";
        e.target.classList.replace("bg-gray-200", "bg-red-50");
        e.target.classList.replace("text-gray-500", "text-red-600");
    }
}

window.addEventListener('DOMContentLoaded', loadAllReservations);
