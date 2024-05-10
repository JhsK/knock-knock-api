# 기본 이미지로 Node.js 공식 이미지를 사용 (Node 18 버전)
FROM node:20

# pnpm 설치
RUN npm install -g pnpm

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 애플리케이션 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./

# 패키지 설치
RUN pnpm install --frozen-lockfile

# 애플리케이션 소스 추가
COPY . .

# 애플리케이션 포트를 외부에 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["pnpm", "start:prod"]
