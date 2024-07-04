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


const spinner =  `<div tabindex="-1"
    class="fixed bg-opacity-40 z-100 bg-white top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full justify-end items-end flex">
    <div role="status" class="h-full flex justify-center items-center">
        <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>`;

window.addEventListener('submit', (event: Event) => {
  const target = event.target as HTMLFormElement;
  const method = target.method;
  if (method.toLocaleLowerCase() === "get") return;
  document.body.insertAdjacentHTML('beforeend', spinner);
});