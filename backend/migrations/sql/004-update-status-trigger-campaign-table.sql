CREATE OR REPLACE FUNCTION update_campaign_status()
RETURNS TRIGGER AS $$
BEGIN
  IF CURRENT_DATE < NEW.end_date AND NEW.raised_amount < NEW.goal_amount THEN
    NEW.status := 'open';
  ELSE
    NEW.status := 'closed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER campaign_status_trigger
BEFORE INSERT OR UPDATE ON "campaigns"
FOR EACH ROW
EXECUTE FUNCTION update_campaign_status();