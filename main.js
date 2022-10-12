

function generatreArray(lenght, maxValue){
    const ar = Array.from({length: lenght}, () => Math.floor(Math.random() * maxValue));
    return ar;
}

function showArray(array){
    const main = document.getElementById("main");
    main.innerHTML = '';
    let newDiv = document.createElement("div");
    newDiv.setAttribute('class', 'bar');
    array.forEach((element, index) => {
        main.innerHTML += `<div class='bar' style='height: ${element}%;'></div>`;
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


async function bubbleSort(arr, time){
    let bars = document.getElementsByClassName('bar');
    //Outer pass
    for(let i = 0; i < arr.length; i++){

        //Inner pass
        for(let j = 0; j < arr.length - i - 1; j++){

            //Value comparison using ascending order

            if(arr[j + 1] < arr[j]){

                //Swapping
                for(let k = 0; k < bars.lenght; k++){
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "red";
                      }
                }
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bars[j].style.height = arr[j] + "%";
                bars[j].style.backgroundColor = "lightgreen";
                //bars[j].innerText = array[j];
                bars[j + 1].style.height = arr[j + 1] + "%";
                bars[j + 1].style.backgroundColor = "lightgreen";
                //height: ' + arr[j+1].toString + '%'
                await sleep(time);
            }
            bars[j + 1].style.backgroundColor = "aqua";
            bars[j].style.backgroundColor = "red";
        }
        await sleep(time);
    };
    bars[0].style.backgroundColor = 'aqua';
    return arr;
};

async function insertionSort(arr, time){
    let bars = document.getElementsByClassName('bar');
    //Start from the second element.
    for(let i = 1; i < arr.length;i++){

        //Go through the elements behind it.
        for(let j = i - 1; j > -1; j--){
            
            //value comparison using ascending order.
            if(arr[j + 1] < arr[j]){

                //swap
                for(let k = 0; k < bars.lenght; k++){
                    if (k !== j && k !== j + 1) {
                        //bars[k].style.backgroundColor = "red";
                      }
                }
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bars[j].style.height = arr[j] + "%";
                bars[j].style.backgroundColor = "lightgreen";
                //bars[j].innerText = array[j];
                bars[j + 1].style.height = arr[j + 1] + "%";
                bars[j + 1].style.backgroundColor = "lightgreen";
                //height: ' + arr[j+1].toString + '%'
                await sleep(time);
            }
            bars[j + 1].style.backgroundColor = "aqua";
            //bars[j].style.backgroundColor = "red";
        }
        await sleep(time);
    };
    bars[0].style.backgroundColor = 'aqua';
  return arr;
}

async function selectionSort(arr, time) {
    let min;
    let bars = document.getElementsByClassName('bar');
    //start passes.
    for (let i = 0; i < arr.length; i++) {
      //index of the smallest element to be the ith element.
      min = i;
  
      //Check through the rest of the array for a lesser element
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
  
      //compare the indexes
      if (min !== i) {
        //swap
        [arr[i], arr[min]] = [arr[min], arr[i]];
        bars[i].style.height = arr[i] + "%";
        bars[i].style.backgroundColor = "lightgreen";
        bars[min].style.height = arr[min] + "%";
        bars[min].style.backgroundColor = "lightgreen";
      }
      await sleep(time);
      bars[i].style.backgroundColor = "aqua";
      bars[min].style.backgroundColor = 'aqua';
      await sleep(time);
    }
  
    return arr;
  }

  async function partition(items, left, right, time) {
    let bars = document.getElementsByClassName('bar');
    //rem that left and right are pointers.
  
    let pivot = items[Math.floor((right + left) / 2)],
      i = left, //left pointer
      j = right; //right pointer
  
    while (i <= j) {
      //increment left pointer if the value is less than the pivot
      while (items[i] < pivot) {
        i++;
      }
  
      //decrement right pointer if the value is more than the pivot
      while (items[j] > pivot) {
        j--;
      }
  
      //else we swap.
      if (i <= j) {
        [items[i], items[j]] = [items[j], items[i]];
        bars[i].style.height = items[i] + "%";
        bars[i].style.backgroundColor = "lightgreen";
        bars[j].style.height = items[i] + "%";
        bars[j].style.backgroundColor = "lightgreen";
        i++;
        j--;
      }
      await sleep(time);
    }
  
    //return the left pointer
    return i;
  }
  
  function quickSort(items, left, right, time) {
  
    if (items.length > 1) {
      partition(items, left, right, time).then((value) => {
        if (left < value - 1) {
            //more elements on the left side
            quickSort(items, left, value - 1);
          }

          if (value < right) {
            //more elements on the right side
            quickSort(items, value, right);
          }
          return items;
      }); //get the left pointer returned
  
      
    }
 //return the sorted array
  }


window.onload = () => {
    const sortButton = document.getElementById("sort-button");
    const generateButton = document.getElementById("generate-button");
    const showArrayButton = document.getElementById("show-array-button");
    const timeRange = document.getElementById("time");
    let array = generatreArray(70, 100);
    showArray(array);
    document.getElementById('array-textarea').value = "[" + array.toString() + "]";
    time.addEventListener('mousemove', () => {
        document.getElementById('time-span').innerHTML = time.value + 'ms';
    });
    sortButton.addEventListener('click', () => {
        const time = timeRange.value;
        if(document.getElementById("animated-checkbox").checked == true){
          let bars = document.getElementsByClassName('bar');
          for(let k = 0; k < bars.length; k++){
            bars[k].style.transition = "all 0.1s";
          }
        //  bars[0].classList.add('animated-checkbox');
        }
        switch(document.querySelector("input[name=type]:checked").value){
            case 'bubble':
                bubbleSort(array, time).then((value) => {
                    document.getElementById("result-textarea").value = value.toString();
                });
                break;
            case 'insertion':
                insertionSort(array, time).then((value) => {
                    document.getElementById("result-textarea").value = value.toString();
                });
            
                break;
            case 'selection':
                selectionSort(array, time).then((value) => {
                    document.getElementById("result-textarea").value = value.toString();
                });
            case 'quicksort':
                quickSort(array, 0, array.length - 1, time);
                quickSort(array, 0, array.length - 1, time);
                break;
        }
    });
    generateButton.onclick = () =>{
        array = generatreArray(document.getElementById('lenght').value, 100);
        showArray(array);
        document.getElementById('array-textarea').value = "[" + array.toString() + "]";
    };
};
