public class Sort{
	/**
	 * 功能：冒泡排序
	 * @param arr [需要排序的数组]
	 */
	public static void bubbleSort(int[] arr){
		if(arr == null || arr.length == 0){
			return;
		}
		// 逆序
		for(int i = 0; i < arr.length-1; i++){
			for(int j = arr.length-1; j > i; j--){
				if(arr[j] < arr[j-1]){
					swap(arr, j, j-1);
				}
			}
		}

		/*for(int i = 0; i < arr.length-1; i++)
		{
			for(int j = arr.length-1; j > i; j--){
				if(arr[j] < arr[j-1])
				{
					swap(arr, j-1, j);
				}
			}
		}*/
		// 顺序
		/*for(int i = arr.length-1; i > 0; i--){
			for(int j = 0; j < i; j++){
				if(arr[j] > arr[j+1]){
					swap(arr, j, j+1);
				}
			}
		}*/
		print(arr);
	}

	/**
	 * 功能：选择排序
	 * @param arr [description]
	 */
	public static void selectSort(int[] arr){
		if(arr == null || arr.length == 0){
			return;
		}
		int minIndex = 0;
		for(int i = 0; i < arr.length-1; i++){
			minIndex = i;
			for(int j = i+1; j < arr.length; j++){
				if(arr[j] < arr[minIndex])
				{
					minIndex = j;
				}
			}

			if(minIndex != i)
			{
				swap(arr, i, minIndex);
			}
		}
		print(arr);
	}

	/**
	 * 功能：插入排序
	 * @param arr [description]
	 */
	public static void insertSort(int[] arr){
		if(arr == null || arr.length == 0){
			return;
		}

		for(int i = 0; i < arr.length; i++)
		{
			int j = i;
			int target = arr[i];

			while(j > 0 && target < arr[j-1]){
				arr[j] = arr[j-1];
				j--;
			}
			arr[j] = target;
		}
		print(arr);
	}
	/**
	 * 功能：交换位置
	 * @param arr [数组]
	 * @param i   [下标]
	 * @param j   [下标]
	 */
	public static void swap(int[] arr, int i, int j){
		arr[i] = arr[i]^arr[j];
		arr[j] = arr[i]^arr[j];
		arr[i] = arr[i]^arr[j];

		/*int temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;*/
	}

	/**
	 * 打印
	 * @param arr [description]
	 */
	public static void print(int[] arr){
		for(int i = 0; i < arr.length; i++){
			System.out.print(arr[i] + " ");
		}
	}
}