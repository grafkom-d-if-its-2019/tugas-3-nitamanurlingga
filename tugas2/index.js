(function() {

    glUtils.SL.init({ callback: function() { main(); } });
  
    function main() {
      var canvas = document.getElementById("glcanvas");
      var gl = glUtils.checkWebGL(canvas);
    
      var vertexShader1 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
      var fragmentShader1 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
      var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
      var program1 = glUtils.createProgram(gl, vertexShader1, fragmentShader1);
      var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
  
      //program1
      function triangle() 
      {
        gl.useProgram(program1);
  
        var triangleVertices = new Float32Array([
            0,    -0.5,
            +0.1, -0.5,
            0,    +0.5,
    
            +0.1, +0.5,
            +0.1, -0.5,
            0,    +0.5,
    
            +0.8, +0.5,
            +0.8, -0.5,
            +0.9, -0.5,
    
            +0.8, +0.5,
            +0.9, -0.5,
            +0.9, +0.5,
    
            +0.1, +0.5,
            +0.8, -0.5,
            +0.8, -0.3,
            
            +0.1, +0.5,
            +0.8, -0.5,
            +0.1, +0.3,
        ]);
  
        var triangleVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
  
        var vPosition = gl.getAttribLocation(program1, 'vPosition');
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  
        if (scale >= 1) melebar = -1;
        else if (scale <= -1) melebar = 1;
        scale = scale + (melebar * 0.0059);
        gl.uniform1f(scaleLoc, scale);
        
      }

      //program2
      function line() 
      {
        gl.useProgram(program2);
        var linesVertices = new Float32Array([
      
         //1
          -0.8, -0.5, 
          -0.8, 0.5, 
          //2
          -0.8, -0.5,
          -0.6, -0.5,
          //3
          -0.8, +0.5,
          -0.6, +0.5,
    
          //4
           -0.6, 0.5,
           -0.5, 0.1,
    
           //5
           -0.6, -0.1,
           -0.5, -0.5,
    
          //6
           -0.3,-0.5,
           -0.3, 0.5,
    
           //7
           -0.3, -0.5,
           -0.5, -0.5,
           
           //8
           -0.3, +0.5,
           -0.5, +0.5,
    
           //9
           -0.6, -0.1,
           -0.6, -0.5,
    
           //10
           -0.5, 0.1,
           -0.5, 0.5,    
        ]);
  
        var linesVerticesBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, linesVerticesBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(linesVertices), gl.STATIC_DRAW);
  
        var vPosition = gl.getAttribLocation(program2, 'vPosition');
        
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  
        gl.enableVertexAttribArray(vPosition);
  
        theta += Math.PI * 0.0059;
        gl.uniform1f(thetaLoc, theta);
      }
      
      var thetaLoc = gl.getUniformLocation(program2, 'theta');
      var theta = 0;
      var scaleLoc = gl.getUniformLocation(program1, 'scale');
      var scale = 1;
      var melebar = 1;
  
      function render() {     
        gl.clearColor(0.3, 0.2, 0.4, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
  
        line();
        gl.drawArrays(gl.LINES, 0, 40);
  
        triangle();
        gl.drawArrays(gl.TRIANGLES, 0,18);
        
        requestAnimationFrame(render);
      }
      render();
    }
  
  })();
  