import java.util.ArrayList;
import java.util.LinkedList;

public class Graph{
	private ArrayList vertexList;//存储点的链接
	private int[][] edges;//邻接矩阵,用来存储边的
	private int numOfEdges;//边的数目
	
	//构造器
	public Graph(int n){
		edges = new int[n][n];
		vertexList = new ArrayList(n);
		numOfEdges = 0;
	}

	//获取节点个数
	public int getNumOfVertex(){
		return vertexList.size();
	}

	//获取边的数目
	public int getNumOfEdges(){
		return numOfEdges;
	}

	//返回节点i的数据
	public Object getValueByIndex(int i){
		return vertexList.get(i);
	}

	//返回v1, v2的权重，也就是v1，v2是否有边相连
	public int getWeight(int v1, int v2)
	{
		return edges[v1][v2];
	}

	//插入节点
	public void insertVertex(Object vertex){
		vertexList.add(vertexList.size(), vertex);
	}

	//插入边
	public void insertEdge(int v1, int v2, int weight){
		edges[v1][v2] = weight;
		numOfEdges++;
	}

	//删除边
	public void deleteEdge(int v1, int v2){
		edges[v1][v2] = 0;
		numOfEdges--;
	}

	//得到第一个邻接节点的下标
	public int getFirstNeighbor(int index)
	{
		for(int i = 0; i < vertexList.size(); i++){
			if(edges[index][i] > 0){
				return i;
			}
		}
		return -1;
	}

	//获得下一个邻接节点的下标
	public int getNextNeighbor(int v1, int v2){
		for( int i = v2+1; i < vertexList.size(); i++){
			if(edges[v1][i] > 0){
				return i;
			}
		}
		return -1;
	}


	//深度优先遍历
	public void depthFirstSearch(){
		boolean[] isVisited = new boolean[getNumOfVertex()];
		for(int i = 0; i < getNumOfVertex(); i++){
			if(!isVisited[i]){
				depthFirstSearch(isVisited, i);
			}
		}
	}

	//深度优先遍历私有函数
	private void depthFirstSearch(boolean[] isVisited, int i){
		//访问该节点
		System.out.print(getValueByIndex(i) + " ");

		//设置该节点已经访问
		isVisited[i] = true;

		//找到第一个邻接点
		int w = getFirstNeighbor(i);
		while( w != -1){
			if(!isVisited[w])
			{
				depthFirstSearch(isVisited, w);
			}
			//获取下一个邻接点
			w = getNextNeighbor(i, w);
		}
	}


	//广度优先遍历
	public void broadFirstSearch(){
		boolean[] isVisited = new boolean[getNumOfVertex()];
		for(int i = 0; i < getNumOfVertex(); i++)
		{
			if(!isVisited[i])
			{
				broadFirstSearch(isVisited, i);
			}
		}
	}

	//广度优先遍历私有函数
	private void broadFirstSearch(boolean[] isVisited, int i){
		int u, w;
		LinkedList queue = new LinkedList();

		//访问节点i
		System.out.print(getValueByIndex(i) + " ");

		//设置该节点已经被访问
		isVisited[i] = true;

		//节点入队列
		queue.addLast(i);

		while(!queue.isEmpty()){
			u = ((Integer)queue.removeFirst()).intValue();
			w = getFirstNeighbor(u);
			while(w != -1){
				if(!isVisited[w])
				{
					//访问该节点
					System.out.print(getValueByIndex(w) + " ");

					//设置该节点已经被访问
					isVisited[w] = true;

					//入队列
					queue.addLast(w);
				}
				w = getNextNeighbor(u, w);
			}
		}
	}
}