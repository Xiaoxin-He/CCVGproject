from manager import create_app
from config import DevlopConfig
# from flask_wtf.csrf import CSRFError
import os
from flask_script import Manager

from html_view import html_blueprint
from app_func.villageDetails import village_blueprint
# mysql
import mysql.connector
# terminal useage
# $ export FLASK_APP=app.py
# $ export FLASK_ENV=development
# $ flask run


# way to ssh log in ssh -i ~/.ssh/id_rsa yuelv@ngrok.luozm.me -p 6655

app = create_app(DevlopConfig)
app.secret_key = "1234"


manager = Manager(app)


# install mysql through mysql package
app.register_blueprint(html_blueprint)

# install the link of details of blueprint
app.register_blueprint(village_blueprint, url_prefix="/ccvg")


if __name__ == "__main__":
  manager.run()


