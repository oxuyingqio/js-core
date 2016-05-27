/**
 * Date
 * 
 * 日期
 * 
 * 对象扩展
 */

/**
 * 格式化日期
 * 
 * @param fmt
 *            格式 yyyy-MM-dd HH:mm:ss
 * @returns
 */
Date.prototype.format = function(fmt) {
	var obj = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for ( var el in obj) {
		if (new RegExp("(" + el + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[el]) : (("00" + obj[el])
					.substr(("" + obj[el]).length)));
		}
	}

	return fmt;
};
/**
 * Math
 * 
 * 数学计算
 * 
 * 对象扩展
 */

/**
 * 静态方法-减法
 * 
 * @param subtrahend
 *            减数
 * @param minuend
 *            被减数
 * @param precision
 *            结果精度
 * @returns
 */
Math.subtract = function(subtrahend, minuend, precision) {
	var a = parseFloat(subtrahend);
	var b = parseFloat(minuend);

	return (a - b).toFixed(precision);
};
/**
 * Object
 * 
 * 超类
 * 
 * 对象扩展
 */

/**
 * 克隆本对象
 * 
 * 使用原型式继承,进行克隆的实现
 * 
 * @returns {Clone}
 */
Object.prototype.clone = function() {
	// 一个空函数
	function Clone() {
	}
	// 函数原型指向本对象
	Clone.prototype = this;
	// 返回空函数的一个实例
	return new Clone();
};
/**
 * String
 * 
 * 字符串
 * 
 * 对象扩展
 */

/**
 * 替换所有字符串
 * 
 * @param target
 *            目标字符
 * @param result
 *            替换字符
 * @returns
 */
String.prototype.replaceAll = function(target, result) {
	return this.replace(new RegExp(target, "g"), result);
};
/**
 * 包
 */

// core 核心包
(function() {
	if (typeof (core) == "undefined") {
		core = {};
	} else {
		throw "全局变量'core'被占用,请确保'core'未被占用后再进行使用";
	}
})();

// lang 基础包
core.lang = core.lang || {};

// constant 常量包
core.constant = core.constant || {};

// util 工具包
core.util = core.util || {};

// event 事件包
core.event = core.event || {};
// event.window window事件包
core.event.window = core.event.window || {};
// event.document document事件包
core.event.document = core.event.document || {};

// log 日志包
core.log = core.log || {};
// log.output 日志输出包
core.log.output = core.log.output || {};

// example 示例包
core.example = core.example || {};

/**
 * Class
 * 
 * 类
 * 
 * 类
 */

/**
 * 构造函数
 */
core.lang.Class = function() {

};

/**
 * 静态方法-类继承
 * 
 * @param SubClass
 *            子类
 * @param SuperClass
 *            父类
 */
core.lang.Class.extend = function(SubClass, SuperClass) {

	// 判断参数个数
	if (arguments.length !== 2) {
		throw "core.lang.Class:参数异常.参数个数必须为2个,得到" + arguments.length + "个";
	}

	// 中间函数
	var Middleware = function() {
	}
	// 中间函数指向父类
	Middleware.prototype = SuperClass.prototype;
	// 子类指向中间函数
	SubClass.prototype = new Middleware();

	// 子类构造不变
	SubClass.prototype.constructor = SubClass;
	// 子类添加superClass静态属性
	SubClass.superClass = SuperClass.prototype;
	if (SuperClass.prototype.constructor === Object.prototype.constructor) {
		SuperClass.prototype.constructor = SuperClass;
	}
};
/**
 * Interface
 * 
 * 接口
 * 
 * 类
 */

/**
 * 构造函数
 * 
 * @param name
 *            名称
 * @param methods
 *            方法组
 */
core.lang.Interface = function(name, methods) {

	// 判断构造参数个数
	if (arguments.length !== 2) {
		throw "core.lang.Interface:构造参数异常.参数个数必须为2个,得到" + arguments.length + "个";
	}

	// 接口名称
	this.name = name;
	// 接口方法
	this.methods = [];
	// 设置接口方法
	for (var i = 0, length = methods.length; i < length; i++) {
		if (typeof (methods[i]) !== "string") {
			throw "core.lang.Interface:构造参数异常.接口方法名必须为字符串";
		}

		this.methods.push(methods[i]);
	}
};

/**
 * 静态方法-接口方法检查
 * 
 * 检查实现接口的对象是否已实现对应接口的方法
 * 
 * @param object
 *            实现接口的对象
 */
core.lang.Interface.ensureImplements = function(object) {

	// 判断参数个数
	if (arguments.length < 2) {
		throw "core.lang.Interface.ensureImplements:参数异常.参数个数至少大于等于2.首参数为实现接口的对象,后续参数为实现的接口对象";
	}

	// 遍历实现的接口对象
	for (var i = 1, length = arguments.length; i < length; i++) {
		// 获取实现的接口对象
		var interface = arguments[i];

		// 检查接口对象是否继承Interface对象
		if (interface.constructor !== core.lang.Interface) {
			throw "core.lang.Interface.ensureImplements:参数异常.传入的接口对象必须继承Interface";
		}

		// 遍历接口方法
		for (var j = 0, jLength = interface.methods.length; j < jLength; j++) {
			// 获取接口方法
			var method = interface.methods[j];

			// 接口方法不存在,或类型不为方法
			if (!object[method] || typeof (object[method]) !== "function") {
				throw "core.lang.Interface.ensureImplements:对象异常.接口" + interface.name + "(" + method + ")方法未实现";
			}
		}
	}
};
/**
 * KeyCode
 * 
 * 键盘Code值
 * 
 * 枚举
 */

core.constant.KeyCode = {

	F1 : "112",
	F2 : "113",
	F3 : "114",
	F4 : "115",
	F5 : "116",
	F6 : "117",
	F7 : "118",
	F8 : "119",
	F9 : "120",
	F10 : "121",
	F11 : "122",
	F12 : "123",

	N0 : "48",
	N1 : "49",
	N2 : "50",
	N3 : "51",
	N4 : "52",
	N5 : "53",
	N6 : "54",
	N7 : "55",
	N8 : "56",
	N9 : "57",

	a : "65",
	b : "66",
	c : "67",
	d : "68",
	e : "69",
	f : "70",
	g : "71",
	h : "72",
	i : "73",
	j : "74",
	k : "75",
	l : "76",
	m : "77",
	n : "78",
	o : "79",
	p : "80",
	q : "81",
	r : "82",
	s : "83",
	t : "84",
	u : "85",
	v : "86",
	w : "87",
	x : "88",
	y : "89",
	z : "90",

	A : "65",
	B : "66",
	C : "67",
	D : "68",
	E : "69",
	F : "70",
	G : "71",
	H : "72",
	I : "73",
	J : "74",
	K : "75",
	L : "76",
	M : "77",
	N : "78",
	O : "79",
	P : "80",
	Q : "81",
	R : "82",
	S : "83",
	T : "84",
	U : "85",
	V : "86",
	W : "87",
	X : "88",
	Y : "89",
	Z : "90",

	Esc : "27",
	Delete : "46",
	Backspace : "8",
	Enter : "13",
	Shift : "16",
	Space : "32",
	Ctrl : "17",
	Alt : "18",

	Left : "37",
	Up : "38",
	Right : "39",
	Down : "40"
}
/**
 * Cookie
 * 
 * Cookie操作
 * 
 * 对象
 */

core.util.Cookie = (function() {

	// cookie操作者
	var cookie;

	/**
	 * 构造函数
	 */
	var Constructor = function() {

	}

	/**
	 * 获取cookie
	 * 
	 * @param name
	 *            cookie名称
	 * @returns
	 */
	Constructor.prototype.get = function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if (arr = document.cookie.match(reg))
			return (arr[2]);
		else
			return null;
	}

	/**
	 * 设置cookie
	 * 
	 * @param name
	 *            名称
	 * @param value
	 *            值
	 * @param expiredays
	 *            过期天数
	 */
	Constructor.prototype.set = function(name, value, expiredays) {
		// 过期天数不存在,则默认7天
		var day = expiredays === null ? 7 : expiredays;
		// 当前时间
		var exp = new Date()
		// 设置过期时间
		exp.setDate(exp.getDate() + day * 24 * 60 * 60 * 1000);
		// 设置cookie
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}

	/**
	 * 删除cookie
	 * 
	 * @param name
	 *            名称
	 */
	Constructor.prototype.del = function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}

	return {
		getCookie : function() {
			// 懒加载,调用时才创建,同时仅创建一个
			if (!cookie) {
				cookie = new Constructor();
			}

			return cookie;
		}
	}
})();
/**
 * Map
 * 
 * 集合
 * 
 * 类
 */

core.util.Map = function() {

	// 备份this对象
	var _this = this;
	// 条目
	var elements = {};
	// 条目数
	var length = 0;

	/**
	 * 返回此映射中的键-值映射关系数。
	 */
	this.size = function() {
		return length;
	};

	/**
	 * 如果此映射未包含键-值映射关系，则返回 true。
	 */
	this.isEmpty = function() {
		return (length == 0);
	};

	/**
	 * 如果此映射包含指定键的映射关系，则返回 true。
	 */
	this.containsKey = function(_key) {
		return (elements[_key] != undefined);
	};

	/**
	 * 如果此映射将一个或多个键映射到指定值，则返回 true。
	 */
	this.containsValue = function(_value) {
		for (key in elements) {
			if (elements[key] == _value) {
				return true;
			}
		}

		return false;
	};

	/**
	 * 返回指定键所映射的值；如果此映射不包含该键的映射关系，则返回 null。
	 */
	this.get = function(_key) {
		return elements[_key];
	};

	/**
	 * 将指定的值与此映射中的指定键关联（可选操作）。
	 */
	this.put = function(_key, _value) {
		if (!_this.containsKey(_key)) {
			length++;
		}

		elements[_key] = _value;
	};

	/**
	 * 如果存在一个键的映射关系，则将其从此映射中移除（可选操作）。
	 */
	this.remove = function(_key) {
		delete elements[_key];
	};

	/**
	 * 从此映射中移除所有映射关系
	 */
	this.clear = function() {
		elements = {};
	};
}
/**
 * Keydown
 * 
 * document键盘事件
 * 
 * 对象
 */

core.event.document.Keydown = [];

document.onkeydown = function(event) {
	for (var i = 0, length = core.event.document.Keydown.length; i < length; i++) {
		core.event.document.Keydown[i](event);
	}
};
/**
 * Resize
 * 
 * window窗口改变事件
 * 
 * 对象
 */

core.event.window.Resize = [];

window.onresize = function() {
	for (var i = 0, length = core.event.window.Resize.length; i < length; i++) {
		core.event.window.Resize[i]();
	}
}

/**
 * Logger
 * 
 * 日志管理者
 * 
 * 对象
 */

core.log.Logger = (function() {

	// 日志管理者
	var logger;

	// 构造函数
	var Constructor = function() {
		// 输出级别
		this.level = core.log.output.Level.debug;
		// 输出模式
		this.mode = core.log.output.Mode.console;
		// 输出格式化参数
		this.format = "[" + core.log.output.Format.level + "] " + core.log.output.Format.msg;
	}

	/**
	 * 输出Error级别日志信息
	 */
	Constructor.prototype.error = function(msg) {
		if (this.level <= core.log.output.Level.error) {
			msg = core.log.output.FormatConvertor.getConvertor().convert(msg, "ERROR", this.format);
			core.log.output.OutputCreator.getOutputor(this.mode).output(msg);
		}
	}

	/**
	 * 输出Warn级别日志信息
	 */
	Constructor.prototype.warn = function(msg) {
		if (this.level <= core.log.output.Level.warn) {
			msg = core.log.output.FormatConvertor.getConvertor().convert(msg, "WARN", this.format);
			core.log.output.OutputCreator.getOutputor(this.mode).output(msg);
		}
	}

	/**
	 * 输出Info级别日志信息
	 */
	Constructor.prototype.info = function(msg) {
		if (this.level <= core.log.output.Level.info) {
			msg = core.log.output.FormatConvertor.getConvertor().convert(msg, "INFO", this.format);
			core.log.output.OutputCreator.getOutputor(this.mode).output(msg);
		}
	}

	/**
	 * 输出Debug级别日志信息
	 */
	Constructor.prototype.debug = function(msg) {
		if (this.level <= core.log.output.Level.debug) {
			msg = core.log.output.FormatConvertor.getConvertor().convert(msg, "DEBUG", this.format);
			core.log.output.OutputCreator.getOutputor(this.mode).output(msg);
		}
	}

	return {
		getLogger : function() {
			// 懒加载,调用时才创建,同时仅创建一个
			if (!logger) {
				logger = new Constructor();
			}

			// 返回日志管理者
			return logger;
		}
	}
})();
/**
 * Console
 * 
 * 控制台输出者
 * 
 * 对象
 */

core.log.output.Console = (function() {

	// 输出者
	var outputor;

	// 构造函数
	var Constructor = function() {

		/**
		 * 实现Outputor接口output方法
		 */
		this.output = function(msg) {
			console.log(msg);
		};
	}

	return {
		// 获取输出者
		getOutputor : function() {
			// 懒加载,调用时才创建,同时仅创建一个
			if (!outputor) {
				outputor = new Constructor();
			}

			return outputor;
		}
	}
})();
/**
 * Format
 * 
 * 格式化参数
 * 
 * 枚举
 */

core.log.output.Format = {

	// 信息
	msg : "%m",
	// 级别
	level : "%p",
	// 位置
	location : "%l",
	// 日期
	date : "%d",
	// 换行
	enter : "%n"
}
/**
 * FormatConvertor
 * 
 * 格式化转换器
 * 
 * 对象
 */

core.log.output.FormatConvertor = (function() {

	// 转换器
	var convertor;

	// 构造函数
	var Constructor = function() {
	}

	/**
	 * 格式转换
	 */
	Constructor.prototype.convert = function(msg, level, format) {
		// 替换消息
		format = format.replaceAll(core.log.output.Format.msg, msg);
		// 替换输出级别
		format = format.replaceAll(core.log.output.Format.level, level);
		// 替换日期??如何支持自定义format
		format = format.replaceAll(core.log.output.Format.date, (new Date()).format("yyyy-MM-dd HH:mm:ss"));
		// 替换换行
		format = format.replaceAll(core.log.output.Format.enter, "\n");

		return format;
	}

	return {
		// 返回转换器
		getConvertor : function() {
			// 懒加载,调用时才创建,同时仅创建一个
			if (!convertor) {
				convertor = new Constructor();
			}

			return convertor;
		}
	}
})();
/**
 * Level
 * 
 * 输出级别
 * 
 * 枚举
 */

core.log.output.Level = {

	// 错误
	error : 4,
	// 警告
	warn : 3,
	// 信息
	info : 2,
	// 调试
	debug : 1
}
/**
 * Mode
 * 
 * 输出模式
 * 
 * 枚举
 */

core.log.output.Mode = {

	// 控制台
	console : "console",
	// 弹出框
	popup : "popup"
}
/**
 * Output
 * 
 * 输出创建者
 * 
 * 对象
 */

core.log.output.OutputCreator = {

	// 获取输出者
	getOutputor : function(mode) {
		var outputor;

		switch (mode) {
		case core.log.output.Mode.console:
			// 获取控制台输出者实例
			outputor = new core.log.output.Console.getOutputor();
		case core.log.output.Mode.popup:
			// 获取弹出框输出者实例
			outputor = new core.log.output.Popup.getOutputor();
		}

		// 判断是否实现接口方法
		core.lang.Interface.ensureImplements(outputor, core.log.output.Outputor);
		// 返回实例
		return outputor;
	}
};
/**
 * Outputor
 * 
 * 输出者
 * 
 * 接口
 */

/**
 * @method output 输出信息
 */
core.log.output.Outputor = new core.lang.Interface("core.log.output.Outputor", [ "output" ]);
/**
 * Pop-up
 * 
 * 弹出框输出者
 * 
 * 对象
 */

core.log.output.Popup = (function() {

	// 输出者
	var outputor;

	// 构造函数
	var Constructor = function() {

		/**
		 * 实现Outputor接口output方法
		 */
		this.output = function(msg) {
			alert(msg);
		};
	}

	return {
		// 获取输出者
		getOutputor : function() {
			// 懒加载,调用时才创建,同时仅创建一个
			if (!outputor) {
				outputor = new Constructor();
			}

			return outputor;
		}
	}
})();