layui.use(['form', 'layedit','jquery', 'laydate','table','upload'], function () {
	//用于关闭弹出层
	var editFrame="";
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,$=layui.jquery,upload = layui.upload;
    var table = layui.table;
    //加载表格数据
    table.render({
        elem: '#test'
        , url: '/student/studentList'
        , toolbar: '#toolbarDemo'
        , title: '用户数据表'
        , page: true
        , cols: [[
            {field: 'name', title: '姓名', width: 200, fixed: 'left', unresize: true, sort: true},
            {field: 'photopath', title: '照片', width: 200,templet: '<div><img src="{{d.photopath}}" style="height: 50px"></div>'}
            , {field: 'age', title: '年龄', width: 200, edit: 'text'}
            , {field: 'sex', title: '性别', width: 200, edit: 'text',templet: function(d){
                    if(d.sex){
                        return "男"
                    }
                    return "女";
                }}
            , {field: 'birthday', title: '出生日期', width: 200}
            , {field: 'hobbies', title: '爱好', width: 200}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150}
        ]]
    });
    //头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'addUser':
            	//清空表单
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
        if (obj.event === 'del') {
        	 layer.confirm('真的删除行么', function (index) {
             	var id=obj.data.id;
             	$.ajax({
     	            type:"DELETE",
     	            url:"/student/deleteStudent/"+id,
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
                "id":data.id,
                "name": data.name,
                "age": data.age ,
                "sex": data.sex ,
                "hobbies": data.hobbies,
                "birthday": data.birthday ,
            });
        }
    });
    //监听搜索框的提交
    form.on('submit(search)',function (data) {
        table.reload('test', {
            where: {
                keyword:data.field.name
            }  //设定异步数据接口的额外参数，任意设
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        }); //只重载数据
        return false;
    });

    //监听提交
    form.on('submit(formDemo)', function(data){
    	var url="";
    	if(data.field.id){
            $.ajax({
                data:data.field,
                type:"PUT",
                url:"/student/updateStudent",
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
                }
            });
    	}else{
            var data = new FormData($('#addForm')[0]);
            $.ajax({
                data:data,
                type:"post",
                url:"/student/addStudent",
                cache: false,
                processData: false,
                contentType: false,
                async: false,
                dataType: 'JSON',
                success:function (data) {
                    if(data.success){
                        layer.msg(data.msg);
                        //关闭指定的弹出层
                        layer.close(editFrame);
                        table.reload('test'); //只重载数据
                    }else{
                        layer.msg(data.msg);
                    }
                }
            });
    	}
        return false;
    });
});