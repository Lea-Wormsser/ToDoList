# ====================================================================
# שלב 1: בנייה ופרסום של שרת ה-.NET (BACKEND PUBLISH)
# ====================================================================
# שימוש ב-SDK לבנייה (זהו השלב הראשון כשעובדים מתוך תיקיית TodoApi)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS publish
WORKDIR /src

# העתקת קובץ הפרויקט (TodoApi.csproj נמצא כעת בשורש ה-WORKDIR)
COPY TodoApi.csproj .
# שחזור התלויות (NuGet packages)
RUN dotnet restore

# העתקת שאר קבצי הפרויקט
COPY . .

# ביצוע פרסום (Publish) של היישום לתיקיית /app/publish
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# ====================================================================
# שלב 2: התמונה הסופית (FINAL RUNTIME)
# ====================================================================
# סביבת זמן הריצה הקלה של ASP.NET להרצה
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# העתקת הקוד המהודר של ה-.NET מהשלב הקודם
COPY --from=publish /app/publish .

# הגדרת ה-PORT (פורט 5116 כפי שמופיע בקוד שלך)
ENV ASPNETCORE_URLS=http://+:5116
EXPOSE 5116

# הפקודה שתופעל אוטומטית בעת הרצת הקונטיינר
ENTRYPOINT ["dotnet", "TodoApi.dll"]