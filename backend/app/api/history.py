from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.database import get_db
from app.models.analysis import AnalysisHistory

router = APIRouter(prefix="/api/v1", tags=["History"])


@router.get("/history")
def get_analysis_history(
    plant: Optional[str] = Query(None, description="Filter by plant name"),
    disease: Optional[str] = Query(None, description="Filter by disease name"),
    search: Optional[str] = Query(None, description="Search query in plant or disease"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    query = db.query(AnalysisHistory)

    if plant:
        query = query.filter(AnalysisHistory.plant.ilike(f"%{plant}%"))
    if disease:
        query = query.filter(AnalysisHistory.disease.ilike(f"%{disease}%"))
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                AnalysisHistory.plant.ilike(search_pattern),
                AnalysisHistory.disease.ilike(search_pattern)
            )
        )

    total = query.count()
    records = query.order_by(AnalysisHistory.created_at.desc()).offset(offset).limit(limit).all()

    return {
        "success": True,
        "total": total,
        "items": [r.to_dict() for r in records]
    }


@router.get("/history/{record_id}")
def get_history_detail(record_id: int, db: Session = Depends(get_db)):
    record = db.query(AnalysisHistory).filter(AnalysisHistory.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")

    return {
        "success": True,
        "record": record.to_dict()
    }
