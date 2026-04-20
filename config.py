import os

class Config:
    pass
class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class TestingConfig(Config): 
    TESTING = True
    DEBUG = True
    db_database = "sqlite:///:memory:"

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing' : TestingConfig,
    'default': DevelopmentConfig
}