import { throttle } from "lodash";

export default {
  mounted(el, binding) {
    if (!binding.value.start || !binding.value.end || !binding.value.move)
      return;

    const isTouchDevice = "ontouchstart" in document.documentElement;

    if (isTouchDevice) {
      const touchMove = ({ touches }) => {
        binding.value.move(touches[0].clientX);
      };
      el.addEventListener("touchstart", binding.value.start);
      el.addEventListener("touchend", binding.value.end);
      el.addEventListener("touchmove", touchMove);

      window.addEventListener("touchend", binding.value.end);
      window.addEventListener("touchmove", touchMove);
    } else {
      const mouseMove = ({ clientX }) => {
        binding.value.move(clientX);
      };
      el.addEventListener("mousedown", binding.value.start);
      el.addEventListener("mouseup", binding.value.end);
      el.addEventListener("mousemove", mouseMove);

      window.addEventListener("mouseup", binding.value.end);
      window.addEventListener("mousemove", mouseMove);
    }

    binding.value.resize &&
      window.addEventListener("resize", throttle(binding.value.resize, 100));
    binding.value.resize && binding.value.resize();
  },
  beforeUnmount(el, binding) {
    const isTouchDevice = "ontouchstart" in document.documentElement;

    if (isTouchDevice) {
      const touchMove = ({ touches }) => {
        binding.value.move(touches[0].clientX);
      };
      el.removeEventListener("touchstart", binding.value.start);
      el.removeEventListener("touchend", binding.value.end);
      el.removeEventListener("touchmove", touchMove);

      window.removeEventListener("touchend", binding.value.end);
      window.removeEventListener("touchmove", touchMove);
    } else {
      const mouseMove = ({ clientX }) => {
        binding.value.move(clientX);
      };
      el.removeEventListener("mousedown", binding.value.start);
      el.removeEventListener("mouseup", binding.value.end);
      el.removeEventListener("mousemove", mouseMove);

      window.removeEventListener("mouseup", binding.value.end);
      window.removeEventListener("mousemove", mouseMove);
    }
    binding.value.resize &&
      window.removeEventListener("resize", throttle(binding.value.resize, 100));
  },
};
