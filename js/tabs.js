import { loadContent, buildContentUrl } from './content.js';

export class Tabs {
  init() {
    this.isLoading = false;
    this.activeTab = 0;
    this.tabs = Array.from(document.querySelectorAll('.tabs_link'));
    this.panels = Array.from(document.querySelectorAll('.tabs_panel'));

    this.tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();

        if (this.isLoading) {
          return;
        }

        const tabIndex = this.tabs.findIndex(tab => (
          event.target === tab
        ));
        this.activateTab(tabIndex);
      })
    })

    this.loadContent(this.activeTab);
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
    this.loadContent(tab);
  }

  async loadContent(tab) {
    const panel = this.panels[tab];
    const section = this.tabs[tab].dataset.section;

    this.isLoading = true;
    panel.setAttribute('aria-busy', true);
    panel.innerHTML = `<p>Loading content…</p>`;

    const contentUrl = buildContentUrl(section);

    try {
      const data = await loadContent(contentUrl);
      if (data.response.status !== 'ok') {
        throw Error;
      }
      panel.innerHTML = this.buildMarkup(data.response);
    } catch (error) {
      panel.innerHTML = `<p>Unable to load content.</p>`;
    };

    this.isLoading = false;
    panel.setAttribute('aria-busy', false);
  }

  buildMarkup(response) {
    const articles = response.results.map(article => `
      <li class="latest_article">
        <a class="latest_headline" href="${article.webUrl}">${article.webTitle}</a>
        <p class="latest_trail">${article.fields.trailText}</p>
      </li>
    `).join('');

    return `<ol class="latest">${articles}</ol>`
  }
}
