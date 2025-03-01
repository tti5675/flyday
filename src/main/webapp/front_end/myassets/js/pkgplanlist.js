document.addEventListener("DOMContentLoaded", async function () {
    const img = document.getElementById("pkgimg");
    const pkgname = document.getElementById("pkgname");
    const pkgplace = document.getElementById("pkgPlace");
    const pkgplanlist = document.getElementById("pkgplanlist");
    const storePics = document.getElementsByClassName("store-pic");
    
    function storename(){
	        document.getElementById("storename1").textContent = sessionStorage.getItem("storeName");
	        document.getElementById("storename2").textContent = sessionStorage.getItem("storeName");
	        for(let storePic of storePics){
        			const picBase64Url = sessionStorage.getItem("storePicBase64");
        			storePic.setAttribute("src", "data:image/jpeg;base64," + picBase64Url); 
      			}
	}
	
	storename();
	
	await fetch("/flyday/pkg/selectpkgno", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkgNo: sessionStorage.getItem("pkgNo") })
    }).then(function(response){
        return response.json();
    }).then(data => {
        img.setAttribute("src", "data:image/jpeg;base64," + data.pkgPicBase64);
        pkgname.textContent = data.pkgName;
        pkgplace.textContent = data.pkgAddress;
    });
	

    await fetch("/flyday/pkgplan/selectpkgno", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkgNo: sessionStorage.getItem("pkgNo") })
    }).then(function(resp){
        return resp.json()
    }).then(datass => {
        datass.forEach(datas =>{
            pkgplanlist.innerHTML += `<div class="card shadow p-2">
                <div class="row g-0">
                    <!-- Card body -->
                    <div class="col-md-9">
                        <div class="card-body d-flex flex-column h-100 py-md-2">
                            <!-- Title -->
                            <h5 class="card-title mb-1"><a>${datas.pkgPlanTitle}</a></h5>
                            <small>${datas.pkgPlanContent}</small>
                            <div><small>${datas.pkgPlanNum}</small></div>
                            <!-- Price and Button -->
                            <div class="d-sm-flex justify-content-sm-between align-items-center mt-3 mt-md-auto">
                                <!-- Price -->
                                <div class="mt-3 mt-sm-0">
                                    <a class="btn btn-sm btn-dark w-100 mb-0" onclick="adddetails(${datas.pkgPlanNo})" id="${datas.pkgPlanNo}">新增明細</a>
                                    <a class="btn btn-sm btn-dark w-100 mb-0" onclick="edit(${datas.pkgPlanNo})" id="${datas.pkgPlanNo}">查看方案/修改</a>
                                    <a class="btn btn-sm btn-dark w-100 mb-0" onclick="editpic(${datas.pkgPlanNo})" id="${datas.pkgPlanNo}">查看/修改(圖片)</a>
                                    <a class="btn btn-sm btn-dark w-100 mb-0" onclick="findplandetails(${datas.pkgPlanNo})" id="${datas.pkgPlanNo}">查看所有明細</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        });
        
    })
 
});

function edit(pkgPlanNo){
    sessionStorage.setItem("pkgPlanNo", pkgPlanNo);
    location = "pkgplanedit.html";
}
function adddetails(pkgPlanNo){
    sessionStorage.setItem("pkgPlanNo", pkgPlanNo);
    location = "pkgplandetailsadd.html";
}
function editpic(pkgPlanNo){
    sessionStorage.setItem("pkgPlanNo", pkgPlanNo);
    location = "pkgplanpicedit.html";
}
function findplandetails(pkgPlanNo){
    sessionStorage.setItem("pkgPlanNo", pkgPlanNo);
    location = "plandetailslist.html";
}