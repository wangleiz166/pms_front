// 项目管理系统 - 完整版JavaScript

// 当前活跃页面
let currentPage = 'timesheet';
let currentUser = '王磊';

// 页面切换函数
function switchPage(pageId) {
    console.log('切换到页面:', pageId);
    
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
        currentPage = pageId;
        console.log('页面切换成功:', pageId);
    } else {
        console.error('页面不存在:', pageId + 'Page');
    }
}

// 审核中心标签页切换
function switchApprovalTab(tabName) {
    const tabBtns = document.querySelectorAll('#approval-centerPage .tab-btn');
    const tabContents = document.querySelectorAll('#approval-centerPage .tab-content');
    
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    const targetContent = document.getElementById(`${tabName}-approval`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    console.log('审核中心切换到:', tabName);
}

// 系统管理标签页切换
function switchSystemTab(tabName) {
    const tabContents = document.querySelectorAll('#system-managementPage .tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const tabBtns = document.querySelectorAll('#system-managementPage .tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const targetContent = document.getElementById(`system-${tabName}`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    console.log('系统管理切换到:', tabName);
}

// 报表分析时间维度筛选功能
function switchTimeDimension(dimension) {
    const tabs = document.querySelectorAll('#report-analysisPage .time-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.background = 'white';
        tab.style.color = '#333';
    });
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
        event.currentTarget.style.background = '#4A90E2';
        event.currentTarget.style.color = 'white';
    }
    
    // 隐藏所有选择器
    const timeSelector = document.getElementById('timeSelector');
    const quarterSelector = document.getElementById('quarterSelector');
    const yearSelector = document.getElementById('yearSelector');
    const customDateRange = document.getElementById('customDateRange');
    
    if (timeSelector) timeSelector.style.display = 'none';
    if (quarterSelector) quarterSelector.style.display = 'none';
    if (yearSelector) yearSelector.style.display = 'none';
    if (customDateRange) customDateRange.style.display = 'none';
    
    // 根据维度显示相应的选择器
    switch(dimension) {
        case 'month':
            if (timeSelector) {
                timeSelector.style.display = 'flex';
                // 设置当前年月
                const currentDate = new Date();
                const yearSelect = document.getElementById('yearSelect');
                const monthSelect = document.getElementById('monthSelect');
                if (yearSelect) yearSelect.value = currentDate.getFullYear();
                if (monthSelect) monthSelect.value = currentDate.getMonth() + 1;
            }
            break;
        case 'quarter':
            if (quarterSelector) {
                quarterSelector.style.display = 'flex';
                // 设置当前年季度
                const currentDate = new Date();
                const quarterYearSelect = document.getElementById('quarterYearSelect');
                const quarterSelect = document.getElementById('quarterSelect');
                if (quarterYearSelect) quarterYearSelect.value = currentDate.getFullYear();
                if (quarterSelect) {
                    const currentQuarter = Math.ceil((currentDate.getMonth() + 1) / 3);
                    quarterSelect.value = currentQuarter;
                }
            }
            break;
        case 'year':
            if (yearSelector) {
                yearSelector.style.display = 'flex';
                // 设置当前年
                const currentDate = new Date();
                const yearYearSelect = document.getElementById('yearYearSelect');
                if (yearYearSelect) yearYearSelect.value = currentDate.getFullYear();
            }
            break;
        case 'custom':
            if (customDateRange) {
                customDateRange.style.display = 'flex';
                // 设置默认日期范围（最近30天）
                const startDate = document.getElementById('startDate');
                const endDate = document.getElementById('endDate');
                if (startDate && endDate) {
                    const today = new Date();
                    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                    startDate.value = thirtyDaysAgo.toISOString().split('T')[0];
                    endDate.value = today.toISOString().split('T')[0];
                }
            }
            break;
    }
    
    const dimensionNames = {
        'month': '月度',
        'quarter': '季度', 
        'year': '年度',
        'custom': '自定义'
    };
    
    console.log('报表分析切换到:', dimensionNames[dimension] || dimension);
    showNotification(`已切换到${dimensionNames[dimension] || dimension}维度`, 'info');
}

// 合同管理相关函数
function viewContract(contractId) {
    console.log('查看合同:', contractId);
    showNotification(`查看合同 ${contractId} 详情`, 'info');
}

function editContract(contractId) {
    console.log('编辑合同:', contractId);
    showNotification(`编辑合同 ${contractId}`, 'info');
}

function deleteContract(contractId) {
    if (confirm(`确定要删除合同 ${contractId} 吗？`)) {
        console.log('删除合同:', contractId);
        showNotification(`合同 ${contractId} 已删除`, 'success');
    }
}

// 智效中心相关函数
function handleAISearch() {
    const input = document.getElementById('aiSearchInput');
    const conversation = document.getElementById('aiConversation');
    const messages = document.getElementById('conversationMessages');
    
    if (input && input.value.trim()) {
        // 显示对话区域
        if (conversation) {
            conversation.style.display = 'block';
        }
        
        // 添加用户消息
        if (messages) {
            const userMessage = document.createElement('div');
            userMessage.style.cssText = 'margin-bottom: 16px; padding: 12px 16px; border-radius: 12px; max-width: 80%; background: #667eea; color: white; margin-left: auto;';
            userMessage.textContent = input.value;
            messages.appendChild(userMessage);
            
            // 添加AI回复（模拟）
            setTimeout(() => {
                const aiMessage = document.createElement('div');
                aiMessage.style.cssText = 'margin-bottom: 16px; padding: 12px 16px; border-radius: 12px; max-width: 80%; background: white; border: 1px solid #e0e0e0; margin-right: auto;';
                aiMessage.textContent = '感谢您的问题！我正在分析您的项目管理需求，稍后会为您提供个性化的建议和解决方案。';
                messages.appendChild(aiMessage);
                
                // 滚动到底部
                messages.scrollTop = messages.scrollHeight;
            }, 1000);
            
            // 清空输入框
            input.value = '';
            
            // 滚动到底部
            setTimeout(() => {
                messages.scrollTop = messages.scrollHeight;
            }, 100);
        }
    }
}

function openFeature(feature) {
    const features = {
        'reports': '智能报表分析',
        'tasks': '定时任务管理', 
        'alerts': '异常报警系统',
        'coze': '扣子开发平台'
    };
    
    showNotification(`${features[feature]}功能正在开发中，敬请期待！`, 'info');
}

// 项目管理相关函数
function showProjectForm() {
    showNotification('新建项目功能正在开发中，敬请期待！', 'info');
}

function viewProjectPlan(projectId) {
    console.log(`查看项目 ${projectId} 的计划...`);
    showNotification(`查看项目 ${projectId} 计划`, 'info');
}

function editProject(projectId) {
    console.log('编辑项目:', projectId);
    showNotification(`编辑项目 ${projectId}`, 'info');
}

function deleteProject(projectId) {
    if (confirm(`确定要删除项目 ${projectId} 吗？`)) {
        console.log('删除项目:', projectId);
        showNotification(`项目 ${projectId} 已删除`, 'success');
    }
}

// 审核相关函数
function viewTimesheetDetail(timesheetId) {
    console.log('查看报工详情:', timesheetId);
    showNotification(`查看报工详情 ${timesheetId}`, 'info');
}

function approveTimesheet(timesheetId) {
    if (confirm('确定要通过这条报工记录吗？')) {
        console.log('通过报工:', timesheetId);
        showNotification(`报工记录 ${timesheetId} 已通过`, 'success');
    }
}

function rejectTimesheet(timesheetId) {
    if (confirm('确定要驳回这条报工记录吗？')) {
        console.log('驳回报工:', timesheetId);
        showNotification(`报工记录 ${timesheetId} 已驳回`, 'warning');
    }
}

// 人员管理相关函数
function editEmployee(employeeId) {
    console.log('编辑员工:', employeeId);
    showNotification(`编辑员工 ${employeeId}`, 'info');
}

function deleteEmployee(employeeId) {
    if (confirm(`确定要删除员工 ${employeeId} 吗？`)) {
        console.log('删除员工:', employeeId);
        showNotification(`员工 ${employeeId} 已删除`, 'success');
    }
}

// 通知函数
function showNotification(message, type = 'info') {
    console.log(`通知 [${type}]: ${message}`);
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// 初始化报表分析时间筛选器
function initReportTimeFilter() {
    // 设置默认显示月度选择器
    const timeSelector = document.getElementById('timeSelector');
    if (timeSelector) {
        timeSelector.style.display = 'flex';
    }
    
    // 设置当前年月
    const currentDate = new Date();
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    if (yearSelect) yearSelect.value = currentDate.getFullYear();
    if (monthSelect) monthSelect.value = currentDate.getMonth() + 1;
    
    console.log('报表分析时间筛选器初始化完成');
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，初始化...');
    
    // 默认显示工时管理页面
    switchPage('timesheet');
    
    // 为智效中心搜索框添加回车键监听
    const aiSearchInput = document.getElementById('aiSearchInput');
    if (aiSearchInput) {
        aiSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleAISearch();
            }
        });
    }
    
    // 初始化报表分析时间筛选器
    initReportTimeFilter();
    
    console.log('初始化完成');
});

// 导出函数供HTML调用
window.switchPage = switchPage;
window.switchApprovalTab = switchApprovalTab;
window.switchSystemTab = switchSystemTab;
window.switchTimeDimension = switchTimeDimension;

// 应用时间筛选
function applyTimeFilter() {
    const activeTab = document.querySelector('#report-analysisPage .time-tab.active');
    if (!activeTab) return;
    
    const dimension = activeTab.getAttribute('onclick').match(/'([^']+)'/)[1];
    let filterInfo = '';
    
    switch(dimension) {
        case 'month':
            const yearSelect = document.getElementById('yearSelect');
            const monthSelect = document.getElementById('monthSelect');
            if (yearSelect && monthSelect) {
                filterInfo = `${yearSelect.value}年${monthSelect.value}月`;
            }
            break;
        case 'quarter':
            const quarterYearSelect = document.getElementById('quarterYearSelect');
            const quarterSelect = document.getElementById('quarterSelect');
            if (quarterYearSelect && quarterSelect) {
                const quarterNames = ['', '第一季度', '第二季度', '第三季度', '第四季度'];
                filterInfo = `${quarterYearSelect.value}年${quarterNames[quarterSelect.value]}`;
            }
            break;
        case 'year':
            const yearYearSelect = document.getElementById('yearYearSelect');
            if (yearYearSelect) {
                filterInfo = `${yearYearSelect.value}年`;
            }
            break;
        case 'custom':
            const startDate = document.getElementById('startDate');
            const endDate = document.getElementById('endDate');
            if (startDate && endDate) {
                filterInfo = `${startDate.value} 至 ${endDate.value}`;
            }
            break;
    }
    
    showNotification(`已应用时间筛选: ${filterInfo}`, 'success');
    console.log('应用时间筛选:', filterInfo);
}

// 重置时间筛选
function resetTimeFilter() {
    // 重置为月度并显示当前月
    const monthTab = document.querySelector('#report-analysisPage .time-tab[onclick*="month"]');
    if (monthTab) {
        monthTab.click();
    }
    
    showNotification('时间筛选已重置', 'info');
    console.log('重置时间筛选');
}
window.handleAISearch = handleAISearch;
window.openFeature = openFeature;
window.applyTimeFilter = applyTimeFilter;
window.resetTimeFilter = resetTimeFilter;

// Webhook相关函数
function viewWebhook(webhookId) {
    console.log('查看Webhook:', webhookId);
    showNotification(`查看Webhook ${webhookId} 详情`, 'info');
}

function editWebhook(webhookId) {
    console.log('编辑Webhook:', webhookId);
    showNotification(`编辑Webhook ${webhookId}`, 'info');
}

function deleteWebhook(webhookId) {
    if (confirm(`确定要删除Webhook ${webhookId} 吗？`)) {
        console.log('删除Webhook:', webhookId);
        showNotification(`Webhook ${webhookId} 已删除`, 'success');
    }
}

// API管理相关函数
function viewAPI(apiId) {
    console.log('查看API:', apiId);
    showNotification(`查看API ${apiId} 详情`, 'info');
}

function editAPI(apiId) {
    console.log('编辑API:', apiId);
    showNotification(`编辑API ${apiId}`, 'info');
}

function deleteAPI(apiId) {
    if (confirm(`确定要删除API ${apiId} 吗？`)) {
        console.log('删除API:', apiId);
        showNotification(`API ${apiId} 已删除`, 'success');
    }
}
window.showProjectForm = showProjectForm;
window.viewProjectPlan = viewProjectPlan;
window.editProject = editProject;
window.deleteProject = deleteProject;
window.viewWebhook = viewWebhook;
window.editWebhook = editWebhook;
window.deleteWebhook = deleteWebhook;
window.viewAPI = viewAPI;
window.editAPI = editAPI;
window.deleteAPI = deleteAPI;

// 数据中心相关函数
function switchDataTab(tabName) {
    // 隐藏所有tab内容
    const tabContents = document.querySelectorAll('#data-centerPage .tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 移除所有tab按钮的active状态
    const tabButtons = document.querySelectorAll('#data-centerPage .tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示选中的tab内容
    const selectedContent = document.getElementById(`data-${tabName}`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // 激活选中的tab按钮
    const activeButton = event.currentTarget;
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    const tabNames = {
        'cleaning': '数据清洗',
        'sync': '数据同步'
    };
    
    console.log('数据中心切换到:', tabNames[tabName] || tabName);
    showNotification(`已切换到${tabNames[tabName] || tabName}`, 'info');
}

function viewDataTask(taskId) {
    console.log('查看数据任务:', taskId);
    showNotification(`查看数据任务 ${taskId} 详情`, 'info');
}

function editDataTask(taskId) {
    console.log('编辑数据任务:', taskId);
    showNotification(`编辑数据任务 ${taskId}`, 'info');
}

function deleteDataTask(taskId) {
    if (confirm(`确定要删除数据任务 ${taskId} 吗？`)) {
        console.log('删除数据任务:', taskId);
        showNotification(`数据任务 ${taskId} 已删除`, 'success');
    }
}
window.viewContract = viewContract;
window.editContract = editContract;
window.deleteContract = deleteContract;
window.switchDataTab = switchDataTab;
window.viewDataTask = viewDataTask;
window.editDataTask = editDataTask;
window.deleteDataTask = deleteDataTask;
window.viewTimesheetDetail = viewTimesheetDetail;
window.approveTimesheet = approveTimesheet;
window.rejectTimesheet = rejectTimesheet;
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
window.showNotification = showNotification;

