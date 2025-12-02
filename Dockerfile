# ====================================================================
# שלב 1: בניית לקוח ה-React (FRONTEND BUILD)
# ====================================================================
FROM node:lts-alpine AS frontend
WORKDIR /src/client

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build
# התוצאה הסופית תהיה בתוך /src/client/build

# ====================================================================
# שלב 2: בנייה ופרסום של שרת ה-.NET (BACKEND PUBLISH)
# ====================================================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS publish
WORKDIR /src

COPY TodoApi/TodoApi.csproj TodoApi/
RUN dotnet restore TodoApi/TodoApi.csproj

COPY . .

WORKDIR /src/TodoApi
RUN dotnet publish TodoApi.csproj -c Release -o /app/publish /p:UseAppHost=false

# ====================================================================
# שלב 3: התמונה הסופית (FINAL RUNTIME)
# ====================================================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# 1. העתקת הקוד המהודר של ה-.NET
COPY --from=publish /app/publish .

# 2. העתקת הקבצים הסטטיים של React לתיקיית 'wwwroot'
COPY --from=frontend /src/client/build wwwroot

# הגדרת ה-PORT (פורט 5116 כפי שמופיע בקוד שלך)
ENV ASPNETCORE_URLS=http://+:5116
EXPOSE 5116

# הפקודה שתופעל אוטומטית
ENTRYPOINT ["dotnet", "TodoApi.dll"]