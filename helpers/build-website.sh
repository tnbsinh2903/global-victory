docker build -f ./helpers/website.dockerfile . -t nguyentd92/globalvictoryvn_website:latest -t registry.gitlab.com/nguyentd92/globalvictoryvn_website:latest

docker push nguyentd92/globalvictoryvn_website:latest
