document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const inputRange = document.getElementById("range-input");
  const sortButton = document.getElementById("sort-button");
  const speedRange = document.getElementById("volume");

  function generateArray(numColumns) {
    container.innerHTML = "";
    const array = Array.from({ length: numColumns }, (_, i) => i + 1);

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    array.forEach((value) => {
      const rect = document.createElement("div");
      rect.classList.add("rectangle");
      rect.style.height = `${value * 3}px`;
      container.appendChild(rect);
    });

    return array;
  }

  let array = generateArray(parseInt(inputRange.value));

  const getRectangles = () => document.querySelectorAll(".rectangle");

  async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      let pivotIndex = await partition(arr, left, right);
      await quickSort(arr, left, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, right);
    }
  }

  async function partition(arr, left, right) {
    let pivotIndex = left;
    let pivotValue = arr[right];

    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }
    await swap(arr, pivotIndex, right);
    return pivotIndex;
  }

  async function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];

    const rectangles = getRectangles();

    [rectangles[i].style.height, rectangles[j].style.height] = [
      rectangles[j].style.height,
      rectangles[i].style.height,
    ];

    rectangles[i].classList.add("sorted");
    rectangles[j].classList.add("sorted");
    const speed = parseInt(speedRange.value);
    await new Promise((resolve) => setTimeout(resolve, speed));
    rectangles[i].classList.remove("sorted");
    rectangles[j].classList.remove("sorted");
  }

  sortButton.addEventListener("click", () => {
    quickSort(array);
  });

  inputRange.addEventListener("change", () => {
    const numColumns = parseInt(inputRange.value);
    array = generateArray(numColumns);
  });
});
