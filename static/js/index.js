(function () {
  'use strict';

  function initializeCarousel(carousel) {
    var panels = Array.from(carousel.querySelectorAll('.scene-panel'));
    var sceneButtons = Array.from(carousel.querySelectorAll('[data-scene-index]'));
    var status = carousel.querySelector('.scene-status');
    var currentIndex = 0;

    if (panels.length < 2) return;

    if (!carousel.hasAttribute('tabindex')) carousel.tabIndex = 0;
    carousel.setAttribute('aria-roledescription', 'carousel');
    if (status) {
      status.setAttribute('aria-live', 'polite');
      status.setAttribute('aria-atomic', 'true');
    }

    function buttonIndex(button, fallbackIndex) {
      var index = Number(button.getAttribute('data-scene-index'));
      return Number.isInteger(index) && index >= 0 && index < panels.length
        ? index
        : fallbackIndex;
    }

    function showScene(index) {
      currentIndex = (index + panels.length) % panels.length;
      var focusedPanel = panels.find(function (panel) {
        return panel.contains(document.activeElement);
      });

      panels.forEach(function (panel, panelIndex) {
        panel.hidden = panelIndex !== currentIndex;
      });

      sceneButtons.forEach(function (button, index) {
        if (buttonIndex(button, index) === currentIndex) {
          button.setAttribute('aria-current', 'true');
        } else {
          button.removeAttribute('aria-current');
        }
      });

      if (status) {
        var title = panels[currentIndex].getAttribute('data-scene-title');
        status.textContent = 'Scene ' + (currentIndex + 1) + ' of ' + panels.length
          + (title ? ' · ' + title : '');
      }

      if (focusedPanel && focusedPanel.hidden) {
        carousel.focus({ preventScroll: true });
      }
    }

    carousel.querySelectorAll('[data-carousel-prev]').forEach(function (button) {
      button.addEventListener('click', function () {
        showScene(currentIndex - 1);
      });
    });

    carousel.querySelectorAll('[data-carousel-next]').forEach(function (button) {
      button.addEventListener('click', function () {
        showScene(currentIndex + 1);
      });
    });

    sceneButtons.forEach(function (button, index) {
      var targetIndex = buttonIndex(button, index);
      if (panels[targetIndex] && panels[targetIndex].id) {
        button.setAttribute('aria-controls', panels[targetIndex].id);
      }
      button.addEventListener('click', function () {
        showScene(targetIndex);
      });
    });

    carousel.addEventListener('keydown', function (event) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      var target = event.target;
      if (target instanceof Element && (
        target.closest('input, textarea, select, a, [role="textbox"]') || target.isContentEditable
      )) return;

      var nextIndex;
      switch (event.key) {
        case 'ArrowLeft': nextIndex = currentIndex - 1; break;
        case 'ArrowRight': nextIndex = currentIndex + 1; break;
        case 'Home': nextIndex = 0; break;
        case 'End': nextIndex = panels.length - 1; break;
        default: return;
      }

      event.preventDefault();
      showScene(nextIndex);
    });

    showScene(0);
    carousel.querySelectorAll('.carousel-controls, .scene-tabs').forEach(function (controls) {
      controls.hidden = false;
    });
  }

  function copyWithFallback(text) {
    var previouslyFocused = document.activeElement;
    var selection = window.getSelection();
    var ranges = [];
    if (selection) {
      for (var index = 0; index < selection.rangeCount; index += 1) {
        ranges.push(selection.getRangeAt(index).cloneRange());
      }
    }

    var field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.style.position = 'fixed';
    field.style.top = '0';
    field.style.left = '-9999px';
    document.body.appendChild(field);

    try {
      field.focus({ preventScroll: true });
      field.select();
      field.setSelectionRange(0, field.value.length);
      return document.execCommand('copy');
    } catch (error) {
      return false;
    } finally {
      field.remove();
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus({ preventScroll: true });
      }
      if (selection) {
        selection.removeAllRanges();
        ranges.forEach(function (range) { selection.addRange(range); });
      }
    }
  }

  function initializeCitationCopy(button) {
    var citation = document.getElementById('citation-code');
    if (!citation) return;

    var status = button.parentElement.querySelector('[data-copy-status]');
    if (!status) {
      status = document.createElement('span');
      status.className = 'copy-status';
      status.setAttribute('data-copy-status', '');
      button.insertAdjacentElement('afterend', status);
    }
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');

    button.addEventListener('click', async function () {
      var text = citation.textContent.trim();
      if (!text) {
        status.textContent = 'No citation is available to copy.';
        return;
      }

      button.disabled = true;
      status.textContent = '';
      var copied = false;
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(text);
          copied = true;
        }
      } catch (error) {
        // Clipboard permissions differ between HTTPS, localhost, and local files.
      }

      if (!copied) copied = copyWithFallback(text);
      button.disabled = false;
      status.textContent = copied
        ? 'Citation copied.'
        : 'Could not copy automatically. Select the citation and copy it manually.';
    });
  }

  function initialize() {
    document.querySelectorAll('.qualitative-carousel').forEach(initializeCarousel);
    document.querySelectorAll('[data-copy-citation]').forEach(initializeCitationCopy);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
}());
