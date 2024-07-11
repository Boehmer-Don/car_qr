# flake8: noqa F401
from .auth import auth_blueprint
from .main import main_blueprint
from .user import bp as user_blueprint
from .label import dealer_blueprint
from .report import report_blueprint
from .stripe import stripe_blueprint
from .label_location import location_blueprint
from .sale_report import sale_report as sale_report_blueprint
from .gift_items import gift_item as gift_item_blueprint
from .buyer import buyer_blueprint
