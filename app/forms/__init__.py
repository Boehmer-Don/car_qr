# flake8: noqa F401
from .auth import (
    LoginForm,
    RegistrationForm,
    ForgotForm,
    ChangePasswordForm,
    RegistrationStep2Form,
    SubscriptionPlanForm,
    PaymentForm,
)
from .user import UserForm, AdminForm, ResendInviteForm
from .label import (
    LabelForm,
    LabelUpdateForm,
    LabelsAmountForm,
    SoldLabelForm,
)
from .client import Client
from .label_location import LabelLocationForm
from .seller import SellerForm, EditSellerFrom, LoginAsSellerForm
from .gift_item import GiftItemForm, EditGiftItemForm
from .gift_box import GiftBoxForm, EditSaleRepForm
from .oil_change import OilChangeDoneForm
from .service import ServiceForm
