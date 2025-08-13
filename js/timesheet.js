// 工时填报相关功能

// 打开工时填报模态框
function openTimesheetModal(date = '') {
    const modal = document.getElementById('timesheetModal');
    const workDateInput = document.getElementById('workDate');
    
    if (!modal || !workDateInput) return;
    
    if (date) {
        workDateInput.value = date;
    } else {
        workDateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // 设置默认成员
    const memberSelect = document.getElementById('memberSelect');
    if (memberSelect && currentUser) {
        memberSelect.value = currentUser;
    }
    
    modal.classList.add('show');
}

// 关闭工时填报模态框
function closeTimesheetModal() {
    const modal = document.getElementById('timesheetModal');
    const form = document.getElementById('timesheetForm');
    
    if (modal) {
        modal.classList.remove('show');
    }
    
    if (form) {
        form.reset();
    }
    
    selectedProjectData = null;
    document.querySelectorAll('.project-item').forEach(item => item.classList.remove('selected'));
}

// 选择项目
function selectProject(code, name) {
    selectedProjectData = { code, name };
    const selectedProjectInput = document.getElementById('selectedProject');
    
    if (selectedProjectInput) {
        selectedProjectInput.value = code;
    }
    
    // 更新UI
    document.querySelectorAll('.project-item').forEach(item => item.classList.remove('selected'));
    if (event && event.target) {
        const projectItem = event.target.closest('.project-item');
        if (projectItem) {
            projectItem.classList.add('selected');
        }
    }
    
    showNotification(`已选择项目：${name}`, 'success');
}

// 过滤项目列表
function filterProjects() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const codeElement = item.querySelector('.project-code');
        const nameElement = item.querySelector('.project-name');
        
        if (!codeElement || !nameElement) return;
        
        const code = codeElement.textContent.toLowerCase();
        const name = nameElement.textContent.toLowerCase();
        
        if (code.includes(searchTerm) || name.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 计算人天
function calculateDays() {
    const hoursInput = document.getElementById('workHours');
    const daysInput = document.getElementById('workDays');
    
    if (!hoursInput || !daysInput) return;
    
    const hours = parseFloat(hoursInput.value) || 0;
    const days = (hours / 8).toFixed(1);
    daysInput.value = days;
}

// 切换月份
function changeMonth(direction) {
    // 这里可以实现月份切换逻辑
    showNotification(`切换到${direction > 0 ? '下' : '上'}个月`, 'info');
}
