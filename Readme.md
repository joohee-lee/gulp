# gulp?

- gulp는 node.js 기반의 frontend 빌드 도구로, grunt 와 더불어 가장 많이 사용되고 있는 빌드 도구

## gulp Doc or helpGuide 
- gulpjs.org <https://gulpjs.org/>
- introduction-gulp-js : <https://www.sitepoint.com/introduction-gulp-js/>

## 목표
- gulp 설치 / 확인 
- *.scss 를 *.css 자동변환 
- file 인클루드 
- sprite image 
- web server 실행 및 live reload 
- Scss 파일 수정의 편의를 위한 sourcemap 추가
- 배포용 소스 생성
- 공통파일 include

## TODO
- gulp 설치 
- gulp -sass
- gulp -fileinclude
- gulp -webserver 
- gulp -spritesmith (이미지 스프라이트 만들기)

## v3.9 v4.0 차이 

## Step1.  Install Node.js  

### 1단계. Node.js  install 
- 노드설치 및 버전 확인 :  node -v
- npm 및 버전 확인 :  npm -v


### Step2. Install Gulp  globally

```
//For global use with slush
npm install -g gulp
gulp -v

```

### step3. Configure Your Project

```	
	# gupp-start
		# node_modules
		# ui
			#common
				#fonts
				#icon
				#js
				#scss
			#img 
			#inc 	
```

### step4. Install Gulp Locally

-  Gulp를 이용해서 작업해야 할 폴더로 이동
-  npm init
> name 입력 / projectname (폴더와 동일한 이름이거나 그냥 엔터를 누르면 Sorry, name can no longer contain capital letters.)
> package.json 생성 - 9 번정도 enter. 
- 개발 작업을 할 프로젝트 폴더(local)에 Gulp 다시 설치
- v3.9 / v4.0 비교 
- v3.9 기준 

```
//For local use with gulp
npm install --save-dev gulp

// 
> gulp 실행
> No gulpfile found 
```


### step5. Create a Gulp Configuration File -  gulpfile.js  
```
var gulp = require('gulp');

gulp.task('gulpSetting', function(){

	console.log( "gulp satrt")
});


gulp.task('taskName', function(){
  // 실행시킬 명령 1
  // 실행시킬 명령 2
  // 실행시킬 명령 3
})

> gulp 
```

### step5. Gulp 활용 

#### gulp -sass
```

npm install gulp-sass --save-dev

```

#### gulp -watch 
```

npm install gulp-watch --save-dev

```

#### browser-sync
> http://localhost:3000/html/index.html
```

npm install browser-sync --save-dev

```


#### Scss 파일 수정의 편의를 위한 sourcemap 추가
> SCSS 파일명 및 위치 확인을 위해 sourcemap 설치 및 설정이 필요

```

npm install gulp-sourcemaps –save-dev

```

#### 공통파일 include
- header, footer, lnb 등을 공통
- gulp 를 이용해서 공통파일을 포함

```

npm install gulp-file-include –save-dev

```



#### gulp Doc or helpGuide 
- ui-lab <http://ui-lab.co.kr/start-gulp/>
- <https://recoveryman.tistory.com/285?category=652407>
- 감성프로그래밍<https://programmingsummaries.tistory.com/category/Gulp.js>
