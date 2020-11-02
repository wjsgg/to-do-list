
$(document).ready(function(){
      function getDate() {
        var data = localStorage.getItem("todo-list");  // 将获取到的数据赋给data
        if(data !== null) {   // 如果本地有数据，则返回数据
          return JSON.parse(data); // 本地存储只能存储字符串，所以要想获取里边的数据就必须将字符串转换为数组形式返回
        } else { 
          return [];  // 如果本地没有数据，则返回一个空数组
        }
      }
      function saveDate(data) {
        // 用JSON.stringify()将数组转化成字符串保存到本地存储
        localStorage.setItem("todo-list", JSON.stringify(data));
      }

      function load(){
        var data=getDate();
        $("ul").empty();  // 遍历之前先清空列表
        $.each(data, function(i,e) { 
            $("ul").prepend("<li class='border-bottom'>" +
            "<div class='item'>" +
                "<input class='toggle' type='checkbox'>" +
                "<label data='' name='todo'>" + " " + e.text + "</label>" +
                "<a class='destroy' index='"+i+"'>X</a>" +
            "</div>" +
          "</li>");
          })
        }

        load();  // 第一步先渲染页面，不然一开始刷新页面时列表不显示
        $("#add").click(function(e){
          if($("#title").val()==""){
             alert("请输入内容");
          }
          else{
            var data = getDate();    // 获取本地存储数据
            // 把数组进行更新数据，把最新数据追加给数组
            data.push({text: $("#title").val(), done: false});
            saveDate(data);   // 保存到本地存储
            load();       // 渲染加载到页面
            $(this).val("");            
          };
          }) 

          $("ul").on("click", "a", function() {
            var data = getDate();  // 获取本地数据（data是局部变量，不用担心冲突）
            var index = $(this).attr("index");  // 用attr获取自定义属性index，得到索引
            // splice(index, num)删除数组对象 index为开始删除的位置，num为删除几个
            data.splice(index, 1);
            saveDate(data);
            load();
          })

          $('.toggle').on('click', function(e) {
            var $currentListItemLabel = $(this).closest('li').find('label');
        if ( $currentListItemLabel.attr('data') == 'done' ) {
          $currentListItemLabel.attr('data', '');
          $currentListItemLabel.attr('name', 'todo');
            $currentListItemLabel.css({'text-decoration':'none','background-color':'#ffffff'});
        }
        else {
          $currentListItemLabel.attr('data', 'done');
          $currentListItemLabel.attr('name', 'done');
          $currentListItemLabel.css({'text-decoration':'line-through','background-color':'#c9cfd4'});    
        }
        })
        
        $("#tobeDone").click(function(){
          $("li label[name='done']").parent().parent().toggle();
        })
        $("#comPleted").click(function(){
          $("li label[name='todo']").parent().parent().toggle();
        })
        $("#clear").click(function(){
          $("li").remove();
          localStorage.clear();
        })
      
});

 