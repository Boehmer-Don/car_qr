import 'flowbite';

const themeToggleDarkIcons = document.querySelectorAll(
  '#theme-toggle-dark-icon',
);
const themeToggleLightIcons = document.querySelectorAll(
  '#theme-toggle-light-icon',
);

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  themeToggleLightIcons.forEach(function (el) {
    el.classList.remove('hidden');
  });
  document.documentElement.classList.add('dark');
} else {
  themeToggleDarkIcons.forEach(function (el) {
    el.classList.remove('hidden');
  });
  document.documentElement.classList.remove('dark');
}

const themeToggleButtons = document.querySelectorAll('#theme-toggle');

themeToggleButtons.forEach(function (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function () {
    // toggle icons inside button
    themeToggleDarkIcons.forEach(function (themeToggleDarkIcon) {
      themeToggleDarkIcon.classList.toggle('hidden');
    });

    themeToggleLightIcons.forEach(function (themeToggleLightIcon) {
      themeToggleLightIcon.classList.toggle('hidden');
    });

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  });
});

const flashMessages = document.querySelectorAll('.flash-message');
flashMessages.forEach(function (flashMessage) {
  setTimeout(() => {
    flashMessage.classList.add('hidden');
  }, 2000);
});

// Sidebar image upload
const sidebarLogoUpload = document.querySelector('#sidebar-logo-upload');
const imageUploadInput = document.querySelector(
  '#sidebar-image-input',
) as HTMLInputElement;

if (sidebarLogoUpload) {
  sidebarLogoUpload.addEventListener('click', function () {
    imageUploadInput.click();
  });
}

if (imageUploadInput) {
  imageUploadInput.addEventListener('change', function (e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleImageUpload(file);
    }
  });
}

function handleImageUpload(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const reader = new FileReader();
  reader.onload = function (e) {
    fetch('/auth/sidebar-logo-upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => console.log(response))
      .then(() => window.location.reload())
      .catch(error => {
        console.error('Error:', error);
      });
  };
  reader.readAsDataURL(file);
}
