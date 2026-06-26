type Lang = 'zh' | 'en';

const messages: Record<Lang, Record<string, string>> = {
  zh: {
    // Header
    'status.idle': '等待中',
    'status.running': '运行中',
    'status.completed': '已完成',
    'status.error': '出错',
    'lang.switch': 'EN',

    // InputPanel
    'input.label': '产品名称',
    'input.placeholder': '输入产品名称，如：智能日程助手',
    'input.start': '开始规划',
    'input.running': '运行中...',
    'input.examples': '快速示例',
    'example.1': '智能日程助手',
    'example.2': '在线教育平台',
    'example.3': '健康管理 App',

    // Chat
    'chat.send': '发送',

    // Options
    'options.custom': '或输入自己的想法…',
    'options.done': '确认完成，没有修改意见',
    'options.finalize': '确认完成，请输出最终版本的 PRD 和 Tech Spec',

    // Empty state
    'empty.title': '准备开始产品规划',
    'empty.step1': '产品经理收集需求',
    'empty.step2': '生成需求文档和技术方案',
    'empty.step3': '迭代修改，确认输出最终版',

    // Messages
    'msg.thinking': '思考中...',
    'msg.speaking': '发言中',
    'msg.ended': '对话已结束，可在左侧输入新产品名开始新规划',

    // Phases (timeline)
    'phase.discover': '需求收集',
    'phase.draft': '文档生成',
    'phase.iterate': '迭代优化',

    // Collapsible
    'doc.expand': '展开',
    'doc.collapse': '折叠',

    // Crew / agent labels
    'crew.pm.tag': 'PM 角色',
    'crew.tl.tag': 'TL 角色',
    'agent.pm': '产品经理',
    'agent.dev': '技术主管',

    // Locale name for LLM
    'locale.name': 'Chinese (简体中文)',

    // History
    'history.title': '历史记录',
    'history.delete': '删除',
    'history.loading': '加载中...',
    'history.empty': '该对话暂无历史记录',
    'history.failed': '加载对话历史失败',

    // Lottery — App
    'lottery.appTitle': '彩票下单平台',

    // Lottery — Type
    'lottery.type.thai': '泰国乐透',
    'lottery.type.hanoi': '河内彩票',
    'lottery.type.viet': '越南彩票',

    // Lottery — Form
    'lottery.form.typeLabel': '彩票类型',
    'lottery.form.rowsLabel': '下单列表',
    'lottery.form.addRow': '添加行',
    'lottery.form.removeRow': '删除行',
    'lottery.form.emptyRows': '请点击"添加行"开始下单',
    'lottery.form.numberLabel': '号码',
    'lottery.form.amountLabel': '金额',
    'lottery.form.payoutLabel': '赔付',
    'lottery.form.digitsPlaceholder': '位数字',
    'lottery.form.digitsInfo': '位数要求',
    'lottery.form.oddsInfo': '赔率',
    'lottery.form.totalAmount': '总金额',
    'lottery.form.totalPayout': '总赔付',
    'lottery.form.proceed': '前往支付',

    // Lottery — Payment
    'lottery.payment.summaryTitle': '订单摘要',
    'lottery.payment.channelTitle': '支付渠道',
    'lottery.payment.account': '账号',
    'lottery.payment.back': '返回修改',
    'lottery.payment.confirm': '确认提交',
    'lottery.payment.submitting': '提交中...',
    'lottery.payment.submitError': '提交失败，请重试',

    // Lottery — Confirm
    'lottery.confirm.title': '下单成功！',
    'lottery.confirm.message': '您的彩票订单已成功提交，请等待开奖结果。如有疑问请联系客服。',
    'lottery.confirm.newOrder': '新建订单',
  },
  en: {
    'status.idle': 'Waiting',
    'status.running': 'Running',
    'status.completed': 'Completed',
    'status.error': 'Error',
    'lang.switch': '中文',

    'input.label': 'Product Name',
    'input.placeholder': 'Enter product name, e.g. Smart Calendar',
    'input.start': 'Start Planning',
    'input.running': 'Running...',
    'input.examples': 'Quick Examples',
    'example.1': 'Smart Calendar',
    'example.2': 'Online Education Platform',
    'example.3': 'Health Management App',

    'chat.send': 'Send',

    'options.custom': 'Or type your own thought…',
    'options.done': 'Looks good, no changes needed',
    'options.finalize': 'Confirmed. Please output the final PRD and Tech Spec.',

    'empty.title': 'Ready to Plan',
    'empty.step1': 'PM gathers requirements',
    'empty.step2': 'Generate PRD and Tech Spec',
    'empty.step3': 'Iterate and confirm final version',

    'msg.thinking': 'Thinking...',
    'msg.speaking': 'is speaking',
    'msg.ended': 'Conversation ended. Enter a new product name on the left to start again.',

    'phase.discover': 'Discovery',
    'phase.draft': 'Drafting',
    'phase.iterate': 'Iteration',

    'doc.expand': 'expand',
    'doc.collapse': 'collapse',

    'crew.pm.tag': 'PM',
    'crew.tl.tag': 'TL',
    'agent.pm': 'Product Manager',
    'agent.dev': 'Tech Lead',

    'locale.name': 'English',

    'history.title': 'History',
    'history.delete': 'Delete',
    'history.loading': 'Loading...',
    'history.empty': 'This conversation has no history',
    'history.failed': 'Failed to load conversation history',

    // Lottery — App
    'lottery.appTitle': 'Lottery Ordering Platform',

    // Lottery — Type
    'lottery.type.thai': 'Thai Lotto',
    'lottery.type.hanoi': 'Hanoi Lottery',
    'lottery.type.viet': 'Vietnam Lottery',

    // Lottery — Form
    'lottery.form.typeLabel': 'Lottery Type',
    'lottery.form.rowsLabel': 'Order Lines',
    'lottery.form.addRow': 'Add Row',
    'lottery.form.removeRow': 'Remove Row',
    'lottery.form.emptyRows': 'Click "Add Row" to start ordering',
    'lottery.form.numberLabel': 'Number',
    'lottery.form.amountLabel': 'Amount',
    'lottery.form.payoutLabel': 'Payout',
    'lottery.form.digitsPlaceholder': 'digits',
    'lottery.form.digitsInfo': 'digits required',
    'lottery.form.oddsInfo': 'Odds',
    'lottery.form.totalAmount': 'Total Amount',
    'lottery.form.totalPayout': 'Total Payout',
    'lottery.form.proceed': 'Proceed to Payment',

    // Lottery — Payment
    'lottery.payment.summaryTitle': 'Order Summary',
    'lottery.payment.channelTitle': 'Payment Channels',
    'lottery.payment.account': 'Account',
    'lottery.payment.back': 'Back to Edit',
    'lottery.payment.confirm': 'Confirm & Submit',
    'lottery.payment.submitting': 'Submitting...',
    'lottery.payment.submitError': 'Submission failed, please try again',

    // Lottery — Confirm
    'lottery.confirm.title': 'Order Submitted!',
    'lottery.confirm.message': 'Your lottery order has been submitted successfully. Please wait for the draw results. Contact support if you have questions.',
    'lottery.confirm.newOrder': 'New Order',
  },
};

let currentLang: Lang = 'en';
let listeners: Array<() => void> = [];

export function initLang(): void {
  const browserLang = navigator.language || '';
  currentLang = browserLang.startsWith('zh') ? 'zh' : 'en';
}

export function getLang(): Lang {
  return currentLang;
}

export function toggleLang(): void {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  listeners.forEach((fn) => fn());
}

export function onLangChange(fn: () => void): () => void {
  listeners.push(fn);
  return () => { listeners = listeners.filter((f) => f !== fn); };
}

export function getLocaleName(): string {
  return messages[currentLang]['locale.name'];
}

export function t(key: string): string {
  return messages[currentLang][key] || messages['en'][key] || key;
}
