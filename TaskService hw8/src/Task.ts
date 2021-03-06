class Task extends eventEmit implements TaskConditionContext {
	public id: string;             //任务id
	public name: string;           //任务名称
	public desc: string;           //描述
	public status: TaskStatus;     //任务状态
	// public fromNpcId: string;      //从谁处得到任务
	// public toNpcId: string;        //任务传递给谁
	public current: number;//当前
	public total: number;//总的
	public condition: TaskCondition;//任务条件
	public monsterNumber: number;
	public Service: eventEmit;

	public constructor(id: string, name: string, desc: string,
		fromNpcId: string, toNpcId: string, total: number, Condition: TaskCondition, monsterNumber: number, Service: EventEmitter) {
		super();
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.status = TaskStatus.UNACCEPTABLE;
		this.condition = Condition;
		this.condition.fromNpcId = fromNpcId;
		this.condition.toNpcId = toNpcId;
		this.total = total;
		this.current = 0
		this.monsterNumber = monsterNumber;
		this.Service = Service;
	}

	public checkStatus() {
		if (0 <= this.current && this.current < this.total) {
			return;
		} else if (this.current >= this.total) {
			this.status = TaskStatus.CAN_SUBMIT;
		} else if (this.current == -2) {//已完成状态设为-2
			this.status = TaskStatus.SUBMITTED;
			if (SceneService.sceneService.taskList["task2"].status != TaskStatus.SUBMITTED) {
				SceneService.sceneService.taskList["task2"].status = TaskStatus.ACCEPTABLE;
			}
			SceneService.sceneService.notify();
		}
	}
	public getcurrent() {
		return this.current;
	}

	public setcurrent(num: number) {
		this.current = num;
		this.checkStatus();
	}

}

enum TaskStatus {
	UNACCEPTABLE = 0,       //不可接
	ACCEPTABLE = 1,          //可接
	DURING = 2,              //进行中
	CAN_SUBMIT = 3,          //可交
	SUBMITTED = 4            //已交
}
enum currentStatus {
	NOTCONTINUABLE = -1,
	CONTINUABLE = 0,
	FINISH = -2
}