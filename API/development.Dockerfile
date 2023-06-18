FROM mcr.microsoft.com/dotnet/samples:aspnetapp AS base
WORKDIR /app
EXPOSE 5162
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN ls
WORKDIR /app/API
COPY ["API/API.csproj", "."]
RUN dotnet restore "API.csproj"
RUN ls
WORKDIR /app
COPY ["..","."]
WORKDIR /app/API
RUN ls
RUN dotnet dev-certs https
ENV ASPNETCORE_URLS=https://+:7162;http://+:5162
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "run", "--urls", "http://+:5162;https://+:7162"]
