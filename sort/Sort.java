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
		for(int i = 0; i < arr.length-1; i++)
		{
			for(int j = arr.length-1; j > i; j--){
				if(arr[j] < arr[j-1])
				{
					swap(arr, j-1, j);
				}
			}
		}
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

	public static void swap(int[] arr, int i, int j){
		int temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}

	public static void print(int[] arr){
		for(int i = 0; i < arr.length; i++){
			System.out.print(arr[i] + " ");
		}
	}
}