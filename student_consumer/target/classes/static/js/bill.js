layui.use(['form', 'layedit','jquery', 'laydate','table'], function () {
	//用于关闭弹出层
	var editFrame="";
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,$=layui.jquery;
    var table = layui.table;
    //加载表格数据
    table.render({
        elem: '#test'
        , url: '/bill/billList'
        , toolbar: '#toolbarDemo'
        , title: '用户数据表'
        , page: true
        , cols: [[
            {field: 'billCode', title: '账单编码', width: 80, fixed: 'left', unresize: true, sort: true}
            , {field: 'billName', title: '商品名称', width: 200, edit: 'text'}
            , {field: 'provider', title: '供应商', width: 200, edit: 'text',templet: function(d){
                    return d.provider.providerName}}
            , {field: 'money', title: '总金额', width: 120}
            , {field: 'pay', title: '是否付款', templet: function(d){
                    if(d.pay){
                        return "已付款"
                    }
                    return "<span style='color: red'>未付款<span/>"
                    }
                    }
            , {field: 'createDate', title: '创建时间', width: 150}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150}
        ]]
    });
    //加载下拉框数据
    $(function () {
       $.ajax({
           type:"get",
           url:"/provider/providerList",
           dataType:"json",
           success:function (data) {
                var data=data.data;
                for (i=0;i<data.length;i++){
                    $("#providerName").append('<option value="'+data[i].pid+'">'+data[i].providerName+'</option>');
                    $("#provider").append('<option value="'+data[i].pid+'">'+data[i].providerName+'</option>');

                }
                form.render('select', 'searchForm');
                form.render('select', 'example');
           }
       })
    });
    //头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'addBill':
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
        if (obj.event === 'del') {
        	 layer.confirm('真的删除行么', function (index) {
             	var bid=obj.data.bid;
             	$.ajax({
     	            data:{
     	            	"bid":bid
     	            },
     	            type:"delete",
     	            url:"/bill/deleteBill",
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
                "bid":data.bid,
                "billCode": data.billCode,
                "billName": data.billName ,
                "billCom": data.billCom ,
                "billNum": data.billNum ,
                "provider.pid": data.provider.pid ,
                "money":data.money
            });
        }
    });
    //监听搜索框的提交
    form.on('submit(search)',function (data) {
        table.reload('test', {
            where: data.field  //设定异步数据接口的额外参数，任意设
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        }); //只重载数据
        return false;
    });
    //监听提交
    form.on('submit(formDemo)', function(data){
    	var url="";
    	if(data.field.bid){
            $.ajax({
                data:data.field,
                type:"PUT",
                url:"/bill/updateBill",
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
            $.ajax({
                data:data.field,
                type:"post",
                url:"/bill/addBill",
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
    	}
        return false;
    });
});