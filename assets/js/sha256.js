document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sha256-tool').forEach((tool) => {
    const input = tool.querySelector('.sha256-input');
    const output = tool.querySelector('.sha256-output');

    async function updateHash() {
      const data = new TextEncoder().encode(input.value);

      const hash = await crypto.subtle.digest('SHA-256', data);

      output.textContent = Array
        .from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
    }

    input.addEventListener('input', updateHash);

    // Hash initial
    updateHash();
  });
});
