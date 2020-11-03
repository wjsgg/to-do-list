$(document).ready(function(){
      function getData() {
        var data = localStorage.getItem("todo-list");  // 将获取到的数据赋给data
        if(data !== null) {   // 如果本地有数据，则返回数据
          return JSON.parse(data); // 本地存储只能存储字符串，所以要想获取里边的数据就必须将字符串转换为数组形式返回
        } else { 
          return [];  // 如果本地没有数据，则返回一个空数组
        }
      }
      function saveData(data) {
        // 用JSON.stringify()将数组转化成字符串保存到本地存储
        localStorage.setItem("todo-list", JSON.stringify(data));
      }

      function load(){     
        var data=getData();
        $("ul").empty();  // 遍历之前先清空列表
        $.each(data, function(i,e) { 
            $("ul").append("<li class='border-bottom' index='"+i+"'>" +
            "<div class='item d-flex flex-row'>" +
                "<input class='toggle ' type='checkbox'>" +
                "<label data='' class='flex-grow-1 pl-3'>" + " " + e.text + "</label>" +
                "<a class='destroy' index='"+i+"'>X</a>" +
            "</div>" +
          "</li>");
          })
          decorAtion();
        }

        function Repeat(){
            var data = getData();
            var list = document.getElementsByTagName("LI");
            var i;
            for(i=0;i<list.length;i++){
              if($("#title").val()==data[i].text){
                alert("重复！！！请重新输入");
                $("#title").val()="";
              }
              
            }
            
        }

        load();  // 第一步先渲染页面，不然一开始刷新页面时列表不显示
        $("#add").click(function(e){
          if($("#title").val()==""){
            alert("请输入内容");
          }
          else{
            var data = getData();    // 获取本地存储数据
            // 把数组进行更新数据，把最新数据追加给数组
            data.push({text: $("#title").val(), done: false});
            Repeat();
            if($("#title").val()==""){
            }
            else{
              saveData(data);   // 保存到本地存储
              load();       // 渲染加载到页面           
              $("#title").val(""); 
            }  
          }   
            
          })
          
          $('#title').keypress(function(e) {
            if (e.which === 13) {
              if($("#title").val()==""){
                alert("请输入内容");
              }
              else{
                var data = getData();    // 获取本地存储数据
                // 把数组进行更新数据，把最新数据追加给数组
                data.push({text: $("#title").val(), done: false});
                Repeat();
                if($("#title").val()==""){
                }
                else{
                  saveData(data);   // 保存到本地存储
                  load();       // 渲染加载到页面           
                  $("#title").val(""); 
                }  
              }   
            }
          })

          $("ul").on("click", "a", function() {
            var data = getData();  // 获取本地数据（data是局部变量，不用担心冲突）
            var index = $(this).attr("index");  // 用attr获取自定义属性index，得到索引
            // splice(index, num)删除数组对象 index为开始删除的位置，num为删除几个
            data.splice(index, 1);
            saveData(data);
            load();
          })
          
         
          var x=0; 
          var y=0;
          $("ul").on("click", ".toggle", function() {
            var data = getData();  // 获取本地数据（data是局部变量，不用担心冲突）
            var index = $(this).siblings("a").attr("index");
            if(data[index].done =="true"){
              data[index].done = "false";
              x++;
            }
            else{
              data[index].done = "true";
              y++;
            }  
            saveData(data);
            decorAtion()
          })

          function decorAtion(){
            var data = getData();
            var list = document.getElementsByTagName("LI");
            var i;
            for(i=0;i<list.length;i++){      
                  
              if(data[i].done == "true"){
                $("li").eq(i).find("label").css({'text-decoration':'line-through','background-color':'#c9cfd4'});
                $("li").eq(i).find("input").attr("checked","checked");
              }
              else{
                $("li").eq(i).find("label").css({'text-decoration':'none','background-color':'#ffffff'});
              }
            }
          }
          
        $("#tobeDone").click(function(){
            $("li").show();
            var data = getData();
            var list = document.getElementsByTagName("LI");
            var i;
            for(i=0;i<list.length;i++){           
              if(data[i].done == "true"){
                $("li").eq(i).hide();
                }
              }
        })
        
        $("#comPleted").click(function(){
          $("li").show();
          var data = getData();
          var list = document.getElementsByTagName("LI");
          var i;
          for(i=0;i<list.length;i++){           
            if(data[i].done !== "true"){
              $("li").eq(i).hide();
          }
        }
        })
        
        $("#all").click(function(){
          $("li").show();
        })
        
        $("#clear").click(function(){
          $("li").remove();
          localStorage.clear();
        })
      
});

 