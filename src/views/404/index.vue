<script setup lang="ts">
  import router from '@/router'

  const goHome = () => {
    router.push('/')
  }
</script>

<template>
  <div class="not-found-container">
    <div class="stars"></div>
    <div class="central-content">
      <div class="astronaut">
        <div class="helmet"></div>
        <div class="face">
          <div class="eyes">
            <div class="eye left"></div>
            <div class="eye right"></div>
          </div>
          <div class="mouth"></div>
        </div>
        <div class="body"></div>
      </div>

      <h1 class="title">404</h1>
      <p class="subtitle">页面迷失在太空中</p>
      <p class="description">我们找不到您要访问的页面，可能它已经飞向宇宙深处</p>

      <button @click="goHome" class="home-button">
        <span>返回地球</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  /* 变量定义 */
  $gradient-bg: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  $gradient-text: linear-gradient(to right, #ff8a00, #e52e71);
  $gradient-button: linear-gradient(45deg, #ff8a00, #e52e71);
  $shadow-button: 0 4px 15px rgba(229, 46, 113, 0.4);

  /* 基础样式 */
  .not-found-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: $gradient-bg;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* 星空背景 */
  .stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      radial-gradient(10px 10px at 20px 30px, white, rgba(0, 0, 0, 0)),
      radial-gradient(10px 10px at 40px 70px, white, rgba(0, 0, 0, 0)),
      radial-gradient(10px 10px at 80px 40px, white, rgba(0, 0, 0, 0)),
      radial-gradient(10px 10px at 120px 80px, white, rgba(0, 0, 0, 0));
    background-size: 150px 150px;
    animation: twinkle 5s infinite alternate;
  }

  @keyframes twinkle {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  /* 主要内容区域 */
  .central-content {
    text-align: center;
    z-index: 2;
    padding: 2rem;
    max-width: 600px;

    .title {
      font-size: 8rem;
      margin: 0;
      background: $gradient-text;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: float 3s ease-in-out infinite;
    }

    .subtitle {
      font-size: 2rem;
      margin: 1rem 0;
      color: rgba(255, 255, 255, 0.9);
    }

    .description {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
    }
  }

  /* 返回按钮 */
  .home-button {
    background: $gradient-button;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: $shadow-button;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(229, 46, 113, 0.6);
    }

    &:active {
      transform: translateY(1px);
    }
  }

  /* 宇航员动画 */
  .astronaut {
    width: 150px;
    height: 180px;
    position: relative;
    margin: 0 auto 2rem;
    animation: float 6s ease-in-out infinite;

    .helmet {
      position: absolute;
      width: 120px;
      height: 120px;
      background: white;
      border-radius: 50%;
      top: 0;
      left: 15px;
      box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.1);
    }

    .face {
      position: absolute;
      width: 70px;
      height: 40px;
      background: #f2f2f2;
      border-radius: 20px;
      top: 40px;
      left: 35px;

      .eyes {
        display: flex;
        justify-content: space-between;
        padding: 15px 10px 0;

        .eye {
          width: 12px;
          height: 12px;
          background: #333;
          border-radius: 50%;
          animation: blink 4s infinite;
        }
      }

      .mouth {
        width: 20px;
        height: 5px;
        background: #333;
        margin: 5px auto 0;
        border-radius: 5px;
      }
    }

    .body {
      position: absolute;
      width: 80px;
      height: 90px;
      background: white;
      border-radius: 40px;
      top: 90px;
      left: 35px;
      box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.1);
    }
  }

  /* 动画效果 */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes blink {
    0%,
    50%,
    100% {
      transform: scaleY(1);
    }
    25%,
    75% {
      transform: scaleY(0.1);
    }
  }
</style>
