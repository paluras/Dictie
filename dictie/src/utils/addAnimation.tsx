const addAnimation = () => {
    const animatedText: HTMLElement = document.querySelector(".animated-text")!;
  
    const speech: HTMLElement = document.querySelector(".spoken-text")!;

      setTimeout(() => {
        animatedText.classList.add("slide-in");
        speech?.classList.add("slide-in");
        })
    
  
      // Resolve the promise after a 1-second delay
  
    
 // 1000 milliseconds = 1 second
  
  };

  export default addAnimation