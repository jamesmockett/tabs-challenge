export class Tabs {
  init() {
    this.activeTab = 0;
    this.tabs = Array.from(document.querySelectorAll('.tabs_link'));
    this.panels = Array.from(document.querySelectorAll('.tabs_panel'));

    this.tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();

        const tabIndex = this.tabs.findIndex(tab => (
          event.target === tab
        ));
        this.activateTab(tabIndex);
      })
    })
  }

  activateTab(tab) {
    this.tabs[this.activeTab].setAttribute('aria-selected', false);
    this.tabs[this.activeTab].classList.remove('tabs_link--selected');
    this.panels[this.activeTab].hidden = true;

    this.tabs[tab].setAttribute('aria-selected', true);
    this.tabs[tab].classList.add('tabs_link--selected');
    this.panels[tab].hidden = false;
    this.panels[tab].focus();

    this.activeTab = tab;
  }
}
