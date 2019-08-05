layui.use(['form', 'layedit','jquery', 'laydate','table'], function () {
	//用于关闭弹出层
	var editFrame="";
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,$=layui.jquery;
    var table = layui.table;
    table.render({
        elem: '#test'
        , url: '/provider/providerList'
        , toolbar: '#toolbarDemo'
        , title: '用户数据表'
        , page: true
        , cols: [[
            {field: 'pid', title: 'ID', width: 80, fixed: 'left', unresize: true, sort: true}
            , {field: 'providerCode', title: '供应商编码', width: 200, edit: 'text'}
            , {field: 'providerName', title: '供应商名称', width: 200, edit: 'text'}
            , {field: 'people', title: '联系人', width: 120}
            , {field: 'phone', title: '联系人电话'}
            , {field: 'address', title: '联系地址', width: 150}
            , {field: 'fax', title: '传真', width: 150}
            , {field: 'createDate', title: '创建时间', width: 150}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150}
        ]]
    });
    //头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'addChance':
            	//表单初始赋值
                $("#addForm")[0].reset();
                layui.form.render();
                editFrame=layer.open({
                    type: 1,
                    content: $("#addForm"), //这里content是一个普通的String
                    area: ['700px', '400px']
                });
            	break;
        }
    });
    //监听行工具事件
    table.on('tool(test)', function (obj) {
        //获取每行的数据
        var data = obj.data;
        console.log(data.pid)
        if (obj.event === 'del') {
        	 layer.confirm('真的删除行么', function (index) {
             	var pid=obj.data.pid;
             	$.ajax({
     	            data:{
     	            	"pid":pid
     	            },
     	            type:"delete",
     	            url:"/provider/deleteProvider",
     	            dataType:"json",
     	            success:function (data) {
     	                if(data.success){
     	                    layer.msg(data.msg);
     	                    //关闭指定的弹出层
     	                    table.reload('test'); //只重载数据
     	                }else{
     	                    layer.msg(data.msg);
     	                }
     	            }
         	     });
             });
        } else if (obj.event === 'edit') {
            editFrame=layer.open({
                type: 1,
                content: $("#addForm"), //这里content是一个普通的String
                area: ['700px', '400px']
            });
            form.val('example', {
                "pid": data.pid,
                "providerName": data.providerName ,
                "people": data.people ,
                "phone": data.phone ,
                "address": data.address ,
                "fax": data.fax ,
                "description":data.description
            });
        }
    });
    //监听提交
    form.on('submit(formDemo)', function(data){
    	console.log(data.field);
    	var url="";
    	if(data.field.pid){
            $.ajax({
                data:data.field,
                type:"PUT",
                url:"/provider/updateProvider",
                dataType:"json",
                success:function (data) {
                    if(data.success){
                        layer.msg(data.msg);
                        //关闭指定的弹出层
                        layer.close(editFrame);
                        table.reload('test'); //只重载数据
                    }else{
                        layer.msg(data.msg);
                    }
                    console.log(data);
                }
            });
    	}else{
            $.ajax({
                data:data.field,
                type:"post",
                url:"/provider/addProvider",
                dataType:"json",
                success:function (data) {
                    if(data.success){
                        layer.msg(data.msg);
                        //关闭指定的弹出层
                        layer.close(editFrame);
                        table.reload('test'); //只重载数据
                    }else{
                        layer.msg(data.msg);
                    }
                    console.log(data);
                }
            });
    	}
        return false;
    });
    $("#search").click(function() {
    	table.reload('test', {
      	  where: { //设定异步数据接口的额外参数，任意设
      		  keyword:$("#providerName").val()
      	  }
      	  ,page: {
      	    curr: 1 //重新从第 1 页开始
      	  }
      	}); //只重载数据
	})
});