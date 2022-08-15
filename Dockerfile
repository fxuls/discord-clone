FROM node:16-alpine AS build
WORKDIR /react-app
COPY /react-app/package.json .
COPY /react-app/package-lock.json .
RUN npm install
COPY /react-app/ .
RUN npm run build
# Start with the python:3.9 image
FROM python:3.9

ENV REACT_APP_BASE_URL=https://fxuls-discord-clone.herokuapp.com/

# Set the following enviroment variables
#
# REACT_APP_BASE_URL -> Your deployment URL
# ENV REACT_APP_BASE_URL .
# ENV DATABASE_URL postgresql://open_table_dev:password@localhost/open_table
# FLASK_APP -> entry point to your flask app
ENV FLASK_APP app
# FLASK_ENV -> Tell flask to use the production server
ENV FLASK_ENV production
# SQLALCHEMY_ECHO -> Just set it to true
ENV SQLALCHEMY_ECHO True
# Set the directory for upcoming commands to /var/www
ENV PORT 8000
# ENV SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230

WORKDIR /var/www

# Copy all the files from your repo to the working directory
COPY . .
# Copy the built react app (it's built for us) from the
# /react-app/build/ directory into your flasks app/static directory
#add from node build stage for the react-app/build
COPY --from=build /react-app/build/* app/static/
# RUN apt-get install python3-pip
# install -r requirements.txt
# install psycopg2
RUN pip install -r requirements.txt && pip install psycopg2
# Start the flask environment by setting our
# closing command to gunicorn app:app
EXPOSE 8000
CMD ["gunicorn", "app:app"]
