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
			// 保证单例,仅创建一个对象
			if (!outputor) {
				outputor = new Constructor();
			}

			return outputor;
		}
	}
})();