// 2026年春节倒计时程序
// 2026年春节是2月17日（农历正月初一）

class SpringFestivalCountdown {
    constructor() {
        // 2026年春节日期
        this.springFestivalDate = new Date('2026-02-17T00:00:00');
        this.intervalId = null;
        this.elements = {};
    }

    // 计算倒计时
    calculateCountdown() {
        const now = new Date();
        const difference = this.springFestivalDate - now;

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                isArrived: true
            };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
            isArrived: false
        };
    }

    // 格式化数字（补零）
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    // 更新显示
    updateDisplay() {
        const countdown = this.calculateCountdown();

        if (countdown.isArrived) {
            this.elements.message.textContent = '🎊 2026年春节已到！🎊';
            this.elements.message.classList.add('arrived');
            this.stop();
            return;
        }

        this.elements.days.textContent = this.formatNumber(countdown.days);
        this.elements.hours.textContent = this.formatNumber(countdown.hours);
        this.elements.minutes.textContent = this.formatNumber(countdown.minutes);
        this.elements.seconds.textContent = this.formatNumber(countdown.seconds);

        // 更新总天数
        this.elements.totalDays.textContent = countdown.days;
    }

    // 初始化DOM元素
    initElements() {
        this.elements.days = document.getElementById('days');
        this.elements.hours = document.getElementById('hours');
        this.elements.minutes = document.getElementById('minutes');
        this.elements.seconds = document.getElementById('seconds');
        this.elements.totalDays = document.getElementById('totalDays');
        this.elements.message = document.getElementById('message');
    }

    // 开始倒计时
    start() {
        this.initElements();
        this.updateDisplay();
        this.intervalId = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    // 停止倒计时
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// 页面加载完成后启动倒计时
document.addEventListener('DOMContentLoaded', () => {
    const countdown = new SpringFestivalCountdown();
    countdown.start();
});