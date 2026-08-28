const info = {
  features: { title: '平台功能', html: '<p>支持 VT Markets App、MetaTrader、TradingView 和 WebTrader。具体可用平台取决于您的地区与账户类型。</p><ul><li>多设备访问</li><li>图表与市场信息</li><li>多语言客户支持</li></ul>' },
  products: { title: '可用产品', html: '<p>可了解外汇、贵金属、指数、能源等多类产品。实际可用范围、点差和交易条件请以官方页面为准。</p>' },
  risk: { title: '风险提示', html: '<p>差价合约（CFD）属于复杂金融产品，因杠杆作用可能快速造成亏损。交易前请确认您理解相关风险，并核实适用的监管实体、产品和账户条件。</p>' }
};

const drawer = document.querySelector('.info-drawer');
const drawerTitle = document.querySelector('#drawer-title');
const drawerContent = document.querySelector('#drawer-content');

document.querySelectorAll('[data-go]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.go;
    document.querySelectorAll('.screen').forEach((screen) => { screen.hidden = screen.id !== target; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (button.dataset.mode) document.querySelector(`[data-mode="${button.dataset.mode}"]`)?.click();
  });
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
  });
});

document.querySelector('#register-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('.success')?.classList.add('show');
  event.currentTarget.querySelector('.submit').textContent = '信息已准备好 ↗';
});

document.querySelectorAll('[data-info]').forEach((button) => {
  button.addEventListener('click', () => {
    const content = info[button.dataset.info];
    drawerTitle.textContent = content.title;
    drawerContent.innerHTML = content.html;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  });
});

document.querySelectorAll('[data-close-info]').forEach((button) => {
  button.addEventListener('click', () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); });
});
