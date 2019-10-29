FROM nginx:1.17.5

RUN     mkdir -p /source
WORKDIR /source
COPY    ./dist/NotesJS /source 
# move the output from 'ng build --prod into a folder near by to build'
COPY    ./nginx.conf /etc/nginx/nginx.conf
EXPOSE  8080 
