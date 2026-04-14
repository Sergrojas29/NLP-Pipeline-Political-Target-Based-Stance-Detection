from dataclasses import dataclass

@dataclass
class BiasData:
    aliases: list[str]
    span_index: list[tuple[int, int]]
    tag_ : str
    stance_FAVOR: float
    stance_AGAINST: float
    stance_NEUTRAl: float
    
@dataclass
class ArticleData:
    subject: set[str]
    