const addAnimation = () => {
    const animatedText: HTMLElement = document.querySelector(".animated-text")!;
  
    const speech: HTMLElement = document.querySelector(".spoken-text")!;
  
    return new Promise<void>((resolve) => {
      // Add the animation classes immediately
      animatedText.classList.add("slide-in");
      speech?.classList.add("slide-in");
  
      // Resolve the promise after a 1-second delay
      setTimeout(() => {
        resolve();
      }, 1000); // 1000 milliseconds = 1 second
    });
  };

  export default addAnimation