export default {
  data() {
    return {
      userTheme: "light-theme",
    };
  },
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  methods: {
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;

      const darkModeSwitch = document.getElementById("darkModeSwitch");
      if (theme === "dark-theme") {
        darkModeSwitch.checked = true;
      } else {
        darkModeSwitch.checked = false;
      }
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
    getTheme() {
      return localStorage.getItem("user-theme");
    },
  },
  template: `
    <div id="header">
        
            <div class="mssv">21120575</div>
            <div class="w-title">Movies Info</div>
            <div class="other">
                <div>21575</div>
                <div class="form-check form-switch" id="darkModeSwitch-form">
                    <input @change="toggleTheme" class="form-check-input"
                            type="checkbox" role="switch" id="darkModeSwitch">
                    <label class="form-check-label" for="darkModeSwitch">Dark mode</label>
                </div>
            </div>
       
    </div>
    `,
};
