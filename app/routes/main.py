from flask import Blueprint, jsonify, Response
from app.utils.bias_pipeline import BiasPipeline

main = Blueprint('main', __name__)

pipeline = BiasPipeline()
result = ''

@main.route('/')
def index():
    return "<h1>Hello from Render!</h1><p>Status: Online</p>"




@main.route('/api/getStance',methods=["GET"])
def start_get_stance():
    rawText = BiasPipeline.from_json_basil("app/utils/1b96a5db-8974-46d3-82d7-5dfef02f650e_1.json")
    result = pipeline.get_full_artical_stance(rawText)
    return Response( result, mimetype='application/json')

@main.route('/api/processFinish',methods=["GET"])
def process_finish():
    return Response( result, mimetype='application/json')
    

