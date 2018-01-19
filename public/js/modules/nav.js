class Nav {
  //constructor
  constructor() {
    this.navButton = document.querySelector('.navigation_mobile-button');
    this.navWrap = document.querySelector('.navigation_wrapper');
    this.upperLine = document.querySelector('.navigation_mobile-button_upper-line');
    this.middleLine = document.querySelector('.navigation_mobile-button_middle-line');
    this.bottomLine = document.querySelector('.navigation_mobile-button_bottom-line');


    //initiate methods
    this.open();
    this.close();
  };

  //methods here
  open() {
    this.navButton.addEventListener('click', (e) => {
      this.navWrap.classList.toggle("navigation_wrapper--show");
      this.upperLine.classList.toggle("navigation_mobile-button_upper-line--x");
      this.middleLine.classList.toggle("navigation_mobile-button_middle-line--x");
      this.bottomLine.classList.toggle("navigation_mobile-button_bottom-line--x");
    });
  };

  close() {

  }

}

export default Nav;